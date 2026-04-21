/**
 * Cargonomics Form Backend — Google Apps Script
 * =============================================
 *
 * Receives JSON POSTs from the Cargonomics website forms
 * (apply.html, contact.html) and appends each submission as a row
 * to the first sheet of the bound Google Spreadsheet.
 *
 * AUTO-EVOLVING SCHEMA
 * --------------------
 * The sheet's HEADER ROW is the single source of truth for column order.
 * On each submission, the script compares incoming JSON keys to the
 * current header. Any keys not yet in the header are appended to the
 * right, then the row is written in the resulting column order. Effect:
 * adding a new field to the website form needs no change here. The new
 * field just shows up as a new column on the next submission, and older
 * rows stay correct (they will be empty in the new column).
 *
 * SEED_COLUMNS below is used ONLY when the sheet is empty (first ever
 * submission, or after a manual full clear). Once the header exists,
 * SEED_COLUMNS is ignored.
 *
 * SETUP
 * -----
 * 1. Open the bound Sheet (ID 1JdM2NkkSGRKsB6q63VdxFMQiZQRloAXFnkyYXgl8E8Q).
 * 2. Extensions > Apps Script.
 * 3. Replace all of Code.gs with this file.
 * 4. Save (disk icon).
 * 5. Deploy > New deployment.
 *      Type: Web app
 *      Execute as: Me
 *      Who has access: Anyone
 *    Copy the new Web App URL.
 * 6. If the Web App URL changed, paste it into js/form-submit.js
 *    (replace APPS_SCRIPT_URL).
 *   7. Create a Google Drive folder for applicant uploads. Copy the
 *      folder ID (trailing path segment after /folders/ in the URL)
 *      and paste it into UPLOADS_FOLDER_ID below. Without this,
 *      uploaded files appear as "[PENDING DRIVE SETUP] <name>" in the
 *      sheet rather than uploading.
 *
 * REDEPLOY
 * --------
 * After ANY edit to this file, you MUST do Deploy > New deployment
 * (not "Manage deployments > Edit"). Editing the existing deployment
 * does not push code changes to the live URL. This is an Apps Script
 * quirk, not a project rule.
 *
 * RUN TESTS
 * ---------
 * In the Apps Script editor, select runTests from the function
 * dropdown and click Run. Output appears in View > Logs (or the
 * execution log panel). Tests use a separate "_tests" sheet tab and
 * never touch the production submissions sheet.
 */

var SPREADSHEET_ID = '1JdM2NkkSGRKsB6q63VdxFMQiZQRloAXFnkyYXgl8E8Q';

// Drive folder that receives uploaded applicant files (CV + optional
// other attachment). Create a folder in Google Drive, open it, copy the
// trailing ID from the URL, paste here. The Apps Script service account
// must have write access to this folder (it will by default if you
// created the folder in the same Google account as the Sheet owner).
//
// Leave as '' until set — file-upload fields will be stored as base64
// placeholders in the sheet instead of uploading. Once set, the helper
// saveUploadToDrive_() will save the file and rewrite the cell to the
// uniquified filename.
//
// Set 2026-04-21 by Vasso. Drive URL:
// https://drive.google.com/drive/folders/1cm_Y5yUuzTUatlt4ydVY4xuUFWLDt7rp
var UPLOADS_FOLDER_ID = '1cm_Y5yUuzTUatlt4ydVY4xuUFWLDt7rp';

var TEST_SHEET_NAME = '_tests';

// Seed only. Used to populate the header when the production sheet is
// empty. Never modified at runtime. Safe to extend; safe to leave alone.
var SEED_COLUMNS = [
  'submitted_at',
  'form_source',
  'form_source_env',
  'full_name',
  'email',
  'phone',
  'available_on_bootcamp_dates',
  'full_week_available',
  'day_or_evening_work_schedule',
  'notes',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'fbclid',
  'referrer',
  'landing_page',
  'inquiry_topic',
  'message'
];

// =============================================================
// PRODUCTION HANDLERS
// =============================================================

function doPost(e) {
  return handleSubmission_(e, getProductionSheet_());
}

function doGet() {
  return jsonResponse_({
    status: 'ok',
    message: 'Cargonomics form backend is running.'
  });
}

// =============================================================
// CORE LOGIC (sheet-parameterised so tests can isolate)
// =============================================================

function handleSubmission_(e, sheet) {
  try {
    var data = JSON.parse(e.postData.contents);
    var header = appendSubmission_(sheet, data);
    return jsonResponse_({ status: 'success', columns: header.length });
  } catch (err) {
    return jsonResponse_({ status: 'error', message: err.message });
  }
}

function appendSubmission_(sheet, data) {
  // Serialise concurrent writes so two near-simultaneous POSTs don't
  // race on appending the same new column.
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    // Transform any {filename, mimeType, base64} payload entries into
    // plain filename strings by uploading the content to Drive. Applicant
    // filename is made unique with the submitted_at timestamp + full_name
    // slug so concurrent submissions don't collide.
    Object.keys(data).forEach(function (key) {
      var value = data[key];
      if (value && typeof value === 'object' && value.base64 && value.filename) {
        data[key] = saveUploadToDrive_(value, data);
      }
    });

    var header = ensureHeader_(sheet, data);
    var row = header.map(function (col) {
      return data[col] !== undefined && data[col] !== null ? data[col] : '';
    });
    sheet.appendRow(row);
    return header;
  } finally {
    lock.releaseLock();
  }
}

function ensureHeader_(sheet, data) {
  var lastRow = sheet.getLastRow();

  if (lastRow === 0) {
    var dataKeys = Object.keys(data);
    var seeded = SEED_COLUMNS.slice();
    dataKeys.forEach(function (k) {
      if (seeded.indexOf(k) === -1) seeded.push(k);
    });
    sheet.getRange(1, 1, 1, seeded.length).setValues([seeded]);
    return seeded;
  }

  var lastCol = sheet.getLastColumn();
  var header = sheet.getRange(1, 1, 1, lastCol).getValues()[0];

  var newKeys = Object.keys(data).filter(function (k) {
    return header.indexOf(k) === -1;
  });

  if (newKeys.length > 0) {
    sheet.getRange(1, header.length + 1, 1, newKeys.length).setValues([newKeys]);
    header = header.concat(newKeys);
  }

  return header;
}

// =============================================================
// HELPERS
// =============================================================

function getProductionSheet_() {
  return SpreadsheetApp.openById(SPREADSHEET_ID).getSheets()[0];
}

function getTestSheet_() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(TEST_SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(TEST_SHEET_NAME);
  return sheet;
}

function resetTestSheet_() {
  getTestSheet_().clear();
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Save an uploaded file to Drive. Returns the uniquified filename.
 * Leaves the base64 payload in-place (as a fallback) if UPLOADS_FOLDER_ID
 * is not set, so Vasso can tell at a glance that the Drive setup step
 * is still pending.
 */
function saveUploadToDrive_(upload, submission) {
  if (!UPLOADS_FOLDER_ID) {
    // Drive folder not set yet. Return a marker string that explains
    // what happened, so the sheet cell is not silently empty.
    return '[PENDING DRIVE SETUP] ' + upload.filename;
  }
  var folder = DriveApp.getFolderById(UPLOADS_FOLDER_ID);
  var bytes = Utilities.base64Decode(upload.base64);
  var safeName = buildUploadName_(upload.filename, submission);
  var blob = Utilities.newBlob(bytes, upload.mimeType, safeName);
  var file = folder.createFile(blob);
  return safeName;
}

/**
 * Build a uniquified filename: <iso-date>_<applicant-slug>_<original-name>.
 * Falls back to just <iso-date>_<original-name> if no name is available.
 */
function buildUploadName_(originalName, submission) {
  var ts = (submission.submitted_at || new Date().toISOString())
    .split('T')[0];
  var slug = (submission.full_name || 'anonymous')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40);
  return ts + '_' + slug + '_' + originalName;
}

// =============================================================
// TESTS — Run > runTests in the Apps Script editor
// =============================================================

function runTests() {
  var tests = [
    test_seedHeaderOnEmptySheet_,
    test_basicSubmission_,
    test_autoAppendNewField_,
    test_olderRowsStayValidAfterNewColumn_,
    test_missingKeysBecomeEmptyStrings_,
    test_handleSubmissionParsesJson_,
    test_handleSubmissionReportsErrorOnBadJson_,
    test_SaveUploadPassesThroughWhenDriveUnset_
  ];

  var results = tests.map(function (fn) {
    resetTestSheet_();
    return fn();
  });

  var passed = 0;
  Logger.log('---');
  results.forEach(function (r) {
    if (r.pass) passed += 1;
    Logger.log((r.pass ? 'PASS' : 'FAIL') + ': ' + r.name + (r.pass ? '' : ' — ' + r.message));
  });
  Logger.log('---');
  Logger.log(passed + ' / ' + results.length + ' tests passed');
}

function test_seedHeaderOnEmptySheet_() {
  var name = 'first submission seeds header from SEED_COLUMNS';
  try {
    var sheet = getTestSheet_();
    appendSubmission_(sheet, { submitted_at: 't', full_name: 'Seeded' });

    var header = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    SEED_COLUMNS.forEach(function (col) {
      if (header.indexOf(col) === -1) throw new Error('seed column missing: ' + col);
    });
    return { name: name, pass: true };
  } catch (err) {
    return { name: name, pass: false, message: err.message };
  }
}

function test_basicSubmission_() {
  var name = 'basic submission writes values in header order';
  try {
    var sheet = getTestSheet_();
    appendSubmission_(sheet, {
      submitted_at: '2026-04-21T12:00:00Z',
      full_name: 'Test User',
      email: 'test@example.com'
    });

    var header = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var row = sheet.getRange(2, 1, 1, header.length).getValues()[0];

    if (row[header.indexOf('full_name')] !== 'Test User') throw new Error('full_name mismatch: ' + row[header.indexOf('full_name')]);
    if (row[header.indexOf('email')] !== 'test@example.com') throw new Error('email mismatch');
    return { name: name, pass: true };
  } catch (err) {
    return { name: name, pass: false, message: err.message };
  }
}

function test_autoAppendNewField_() {
  var name = 'unknown field auto-appends as a new column at the right edge';
  try {
    var sheet = getTestSheet_();
    appendSubmission_(sheet, { submitted_at: 't1', full_name: 'First' });

    var headerBefore = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    if (headerBefore.indexOf('brand_new_field') !== -1) throw new Error('test field already exists');

    appendSubmission_(sheet, {
      submitted_at: 't2',
      full_name: 'Second',
      brand_new_field: 'auto-added value'
    });

    var headerAfter = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var idx = headerAfter.indexOf('brand_new_field');
    if (idx === -1) throw new Error('new field not appended');
    if (idx !== headerAfter.length - 1) throw new Error('new field not at right edge: idx=' + idx + ' len=' + headerAfter.length);

    var row = sheet.getRange(3, 1, 1, headerAfter.length).getValues()[0];
    if (row[idx] !== 'auto-added value') throw new Error('new field value mismatch');
    return { name: name, pass: true };
  } catch (err) {
    return { name: name, pass: false, message: err.message };
  }
}

function test_olderRowsStayValidAfterNewColumn_() {
  var name = 'older rows stay valid after a new column appears';
  try {
    var sheet = getTestSheet_();
    appendSubmission_(sheet, { submitted_at: 't1', full_name: 'Old Row' });
    appendSubmission_(sheet, { submitted_at: 't2', full_name: 'New Row', surprise_field: 'x' });

    var header = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var oldRow = sheet.getRange(2, 1, 1, header.length).getValues()[0];
    var idx = header.indexOf('surprise_field');

    if (oldRow[header.indexOf('full_name')] !== 'Old Row') throw new Error('old row corrupted');
    if (oldRow[idx] !== '') throw new Error('old row should be empty in new column, got: ' + oldRow[idx]);
    return { name: name, pass: true };
  } catch (err) {
    return { name: name, pass: false, message: err.message };
  }
}

function test_missingKeysBecomeEmptyStrings_() {
  var name = 'missing keys become empty strings, never undefined';
  try {
    var sheet = getTestSheet_();
    appendSubmission_(sheet, { submitted_at: 't1', full_name: 'A', email: 'a@x', phone: '123' });
    appendSubmission_(sheet, { submitted_at: 't2', full_name: 'B' });

    var header = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var row = sheet.getRange(3, 1, 1, header.length).getValues()[0];

    for (var i = 0; i < row.length; i++) {
      if (row[i] === undefined || row[i] === 'undefined') {
        throw new Error('column ' + header[i] + ' is undefined-y: ' + row[i]);
      }
    }
    if (row[header.indexOf('email')] !== '') throw new Error('email should be empty');
    if (row[header.indexOf('phone')] !== '') throw new Error('phone should be empty');
    return { name: name, pass: true };
  } catch (err) {
    return { name: name, pass: false, message: err.message };
  }
}

function test_handleSubmissionParsesJson_() {
  var name = 'handleSubmission_ parses JSON and returns success';
  try {
    var sheet = getTestSheet_();
    var event = {
      postData: { contents: JSON.stringify({ submitted_at: 't', full_name: 'E2E' }) }
    };
    var response = handleSubmission_(event, sheet);
    var parsed = JSON.parse(response.getContent());

    if (parsed.status !== 'success') throw new Error('expected success, got: ' + parsed.status);
    if (sheet.getLastRow() !== 2) throw new Error('expected 2 rows (header + data), got: ' + sheet.getLastRow());
    return { name: name, pass: true };
  } catch (err) {
    return { name: name, pass: false, message: err.message };
  }
}

function test_handleSubmissionReportsErrorOnBadJson_() {
  var name = 'handleSubmission_ returns error on malformed JSON';
  try {
    var sheet = getTestSheet_();
    var event = { postData: { contents: 'not valid json {{{' } };
    var response = handleSubmission_(event, sheet);
    var parsed = JSON.parse(response.getContent());

    if (parsed.status !== 'error') throw new Error('expected error, got: ' + parsed.status);
    if (sheet.getLastRow() !== 0) throw new Error('sheet should be empty after bad input, got rows: ' + sheet.getLastRow());
    return { name: name, pass: true };
  } catch (err) {
    return { name: name, pass: false, message: err.message };
  }
}

function test_SaveUploadPassesThroughWhenDriveUnset_() {
  var name = 'saveUploadToDrive_ returns [PENDING DRIVE SETUP] marker when UPLOADS_FOLDER_ID is empty';
  try {
    // This test assumes UPLOADS_FOLDER_ID is '' (the default until Vasso
    // pastes the real folder ID). If the Drive folder has been set,
    // this test is expected to be skipped; it will report that state
    // rather than pretend to pass.
    if (UPLOADS_FOLDER_ID) {
      throw new Error('UPLOADS_FOLDER_ID is set; this test only covers the pre-setup path. Temporarily clear it to exercise the marker-string branch.');
    }

    var upload = {
      filename: 'cv.pdf',
      mimeType: 'application/pdf',
      base64: 'JVBERi0xLjQKJeLjz9MK' // arbitrary non-empty base64
    };
    var submission = {
      submitted_at: '2026-04-21T09:00:00Z',
      full_name: 'Test Applicant'
    };

    var result = saveUploadToDrive_(upload, submission);
    var expected = '[PENDING DRIVE SETUP] cv.pdf';
    if (result !== expected) {
      throw new Error('expected "' + expected + '", got: ' + result);
    }

    // Also confirm the pre-processing loop inside appendSubmission_
    // rewrites the payload field to the same marker before writing.
    var sheet = getTestSheet_();
    appendSubmission_(sheet, {
      submitted_at: '2026-04-21T09:00:00Z',
      full_name: 'Test Applicant',
      cv_upload: upload
    });
    var header = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var row = sheet.getRange(2, 1, 1, header.length).getValues()[0];
    var idx = header.indexOf('cv_upload');
    if (idx === -1) throw new Error('cv_upload column missing from header');
    if (row[idx] !== expected) throw new Error('sheet cell expected marker, got: ' + row[idx]);

    return { name: name, pass: true };
  } catch (err) {
    return { name: name, pass: false, message: err.message };
  }
}
