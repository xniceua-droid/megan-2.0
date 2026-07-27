function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheetName = data.sheet || "Orders";
    const action = data.action || "add";
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(sheetName);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      if (sheetName === "Orders") {
        sheet.appendRow(["ID", "Date", "Client", "Phone", "Service", "Master", "Status", "Price", "Master_Cut"]);
      }
    }
    
    if (action === "add") {
      const row = [
        new Date().getTime(),
        data.date || new Date().toLocaleString(),
        data.clientName || "",
        data.clientPhone || "",
        data.service || "",
        data.master || "",
        data.status || "New",
        data.price || 0,
        (data.price * 0.45) || 0 // Master cut 45%
      ];
      sheet.appendRow(row);
      return ContentService.createTextOutput(JSON.stringify({ success: true, row: row })).setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ success: false, message: "Unknown action" })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.message })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Orders");
  
  if (!sheet) {
    return ContentService.createTextOutput(JSON.stringify({ success: true, data: [] })).setMimeType(ContentService.MimeType.JSON);
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const result = rows.map(row => {
    let obj = {};
    headers.forEach((header, i) => {
      obj[header] = row[i];
    });
    return obj;
  });
  
  return ContentService.createTextOutput(JSON.stringify({ success: true, data: result })).setMimeType(ContentService.MimeType.JSON);
}
