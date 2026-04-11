/**
 * Cargonomics Form Backend — Google Apps Script
 * =============================================
 *
 * SETUP INSTRUCTIONS:
 *
 * 1. Create a new Google Sheet (this will store all form submissions).
 *    Copy the spreadsheet ID from the URL:
 *    https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
 *
 * 2. Open Apps Script: Extensions > Apps Script (from within the Sheet).
 *
 * 3. Delete any existing code in Code.gs and paste this entire file.
 *
 * 4. Replace YOUR_SPREADSHEET_ID below with your actual spreadsheet ID.
 *
 * 5. Deploy as a web app:
 *    - Click "Deploy" > "New deployment"
 *    - Type: "Web app"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 *    - Click "Deploy"
 *    - Authorize when prompted (review permissions, click Allow)
 *    - Copy the Web App URL
 *
 * 6. Paste the Web App URL into js/form-submit.js, replacing
 *    YOUR_APPS_SCRIPT_WEB_APP_URL.
 *
 * 7. Test by submitting a form on the website. Check the Google Sheet
 *    for a new row.
 *
 * REDEPLOYMENT:
 *   After editing this script, you must create a NEW deployment
 *   (Deploy > New deployment) for changes to take effect. Editing
 *   the existing deployment does not update the live URL.
 *
 * COLUMN ORDER (auto-created on first submission):
 *   submitted_at, form_source, full_name, email, phone,
 *   available_on_bootcamp_dates, full_week_available,
 *   day_or_evening_work_schedule, notes, utm_source, utm_medium,
 *   utm_campaign, utm_term, utm_content, gclid, fbclid,
 *   referrer, landing_page, inquiry_topic, message
 */

var SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';

/**
 * Column order for the spreadsheet header row.
 * New fields should be appended to the end of this array.
 */
var COLUMNS = [
  'submitted_at',
  'form_source',
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

/**
 * Handles POST requests from the website forms.
 * Parses JSON body, writes a row to the spreadsheet.
 */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheets()[0];

    // Create header row if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(COLUMNS);
    }

    // Build the row in column order, using empty string for missing fields
    var row = COLUMNS.map(function (col) {
      return data[col] !== undefined && data[col] !== null ? data[col] : '';
    });

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handles GET requests (optional, for testing).
 * Visit the web app URL in a browser to verify it is deployed.
 */
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'ok',
      message: 'Cargonomics form backend is running.'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
