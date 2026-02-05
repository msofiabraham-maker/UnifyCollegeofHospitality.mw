/**
 * Apps Script Web App to receive JSON form data, generate a Google Doc, export to PDF,
 * save to Drive (the account that deploys this script), set sharing to anyone-with-link,
 * and return a forced download URL.
 */

function doPost(e){
  try{
    const data = JSON.parse(e.postData.contents);

    // Build document body
    const doc = DocumentApp.create('Application - ' + (data.fullName || 'Unnamed'));
    const body = doc.getBody();
    // Header with college name
    body.appendParagraph('UNIFY COLLEGE OF HOSPITALITY').setHeading(DocumentApp.ParagraphHeading.HEADING1);
    body.appendParagraph('Student Application Form').setHeading(DocumentApp.ParagraphHeading.HEADING2);
    body.appendParagraph('Date: ' + new Date().toLocaleString());
    body.appendHorizontalRule();

    // Personal details
    body.appendParagraph('PERSONAL INFORMATION').setHeading(DocumentApp.ParagraphHeading.HEADING3);
    for (var k in data){
      if (['fullName','sex','age','dob','phone','email','district','village','ta','marital','nationality','denomination'].indexOf(k)!==-1){
        body.appendParagraph(k + ': ' + (data[k] || ''));
      }
    }

    body.appendParagraph('PARENTS / GUARDIAN DETAILS').setHeading(DocumentApp.ParagraphHeading.HEADING3);
    body.appendParagraph('Name: ' + (data.pg_name||''));
    body.appendParagraph('Phone: ' + (data.pg_phone||''));
    body.appendParagraph('Occupation: ' + (data.pg_occupation||''));

    body.appendParagraph('STUDENT CODE OF CONDUCT').setHeading(DocumentApp.ParagraphHeading.HEADING3);
    var code = `UNIFY COLLEGE OF HOSPITALITY – STUDENT CODE OF CONDUCT

1. Introduction
This Code of Conduct outlines the standards of behavior expected from all students of Unify College of Hospitality. As future professionals in the hospitality and tourism industry, students are required to uphold values of integrity, discipline, respect and excellence in all aspects of their academic and practical training.

2. Professionalism
• High standards of professionalism are required at all times.
• Punctuality and attendance are mandatory.
• Assignments and examinations must be completed honestly.
• Plagiarism, cheating, and dishonesty are prohibited.
• Initiative, teamwork, and commitment to learning are required.

3. Dress Code
• Prescribed uniform or professional attire must be worn.
• Uniforms must be clean and well-ironed.
• Casual wear is not allowed during class hours.
• Student ID must be worn at all times.

4. Personal Grooming
• Personal hygiene must be maintained.
• Hair must be neat and professional.
• Male students must be clean-shaven or neatly trimmed.
• Female students should keep makeup minimal.
• Jewelry must be minimal and professional.

5. Interpersonal Conduct
• Respect and courtesy are mandatory.
• Bullying, harassment, and discrimination are prohibited.
• Teamwork and positive communication are expected.

6. Ethical Behaviour
• Honesty, integrity, and accountability are compulsory.
• College property must be respected.
• Alcohol and drugs are prohibited.
• College policies must be followed.

7. Attendance and Punctuality
• Attendance is compulsory.
• Students arriving more than 15 minutes late may be denied entry.

8. Use of College Facilities
• Facilities must be used responsibly.
• Cleanliness must be maintained.

9. Conflict Resolution
• Conflicts should be resolved amicably.
• Serious issues must be reported.
• Retaliation is prohibited.

10. Discipline and Sanctions
• Violations may result in warnings, suspension, or expulsion.
• Students have the right to a fair hearing.

11. Commitment to Excellence
Students must uphold the values and reputation of Unify College of Hospitality at all times.`;

    body.appendParagraph(code);

    body.appendParagraph('\nStudent Agreement: I have read and understood the Unify College of Hospitality Student Code of Conduct and I agree to abide by it.');
    body.appendParagraph('\nSigned: ' + (data.fullName || '') ).setBold(true);

    doc.saveAndClose();

    // Export as PDF
    const pdfBlob = DriveApp.getFileById(doc.getId()).getAs('application/pdf').setName((data.fullName||'application') + '.pdf');

    // Save PDF to Drive root (script runs as the deploying user)
    const savedFile = DriveApp.createFile(pdfBlob);
    // Make accessible by anyone with link
    savedFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    const fileId = savedFile.getId();
    const downloadUrl = 'https://drive.google.com/uc?export=download&id=' + fileId;

    return ContentService.createTextOutput(JSON.stringify({downloadUrl: downloadUrl})).setMimeType(ContentService.MimeType.JSON);
  }catch(err){
    return ContentService.createTextOutput(JSON.stringify({error: err.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Optional: Use this function as an installable trigger for Google Form responses.
 * If you prefer Google Forms, bind this script to the same account and use an onFormSubmit trigger.
 */
function onFormSubmit(e){
  // e.namedValues contains the form response mapping; you can adapt above logic to use it.
}