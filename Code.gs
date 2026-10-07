const SHEET_NAME = "Investor Confirmations";

function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp",
      "Full Name",
      "Organisation / Venture / Fund",
      "Designation / Role",
      "Contact Number",
      "Email",
      "LinkedIn",
      "Preferred Attendance Day",
      "Confirmed",
      "Queries",
      "Source"
    ]);
    sheet.setFrozenRows(1);
  }
}

function doGet() {
  setupSheet();
  return ContentService
    .createTextOutput(JSON.stringify({status: "ok", service: "PSF27 Investor Confirmation"}))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  setupSheet();

  try {
    const data = JSON.parse(e.postData.contents || "{}");

    if (!data.fullName || !data.organisation || !data.designation ||
        !data.contact || !data.email || !data.attendanceDay ||
        data.confirmation !== "on") {
      return json({status: "error", message: "Missing required fields."});
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    sheet.appendRow([
      new Date(),
      clean(data.fullName),
      clean(data.organisation),
      clean(data.designation),
      clean(data.contact),
      clean(data.email),
      clean(data.linkedin || ""),
      clean(data.attendanceDay),
      "CONFIRMED",
      clean(data.queries || ""),
      clean(data.source || "PSF27 Website")
    ]);

    return json({status: "success"});
  } catch (err) {
    return json({status: "error", message: String(err)});
  }
}

function clean(value) {
  return String(value ?? "").trim().slice(0, 2000);
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
