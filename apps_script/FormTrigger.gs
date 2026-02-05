/**
 * Triggered by a Google Form submission (installable trigger onFormSubmit).
 * Generates a filled PDF from the submitted responses, saves it to Drive (owner account),
 * makes it shareable, and emails the applicant a forced-download link plus a WhatsApp link.
 */
function onFormSubmit(e){
  try{
    var named = e.namedValues || {};
    // Map form fields to keys used in the site version
    var data = {
      fullName: getFirst(named['Full Name(s)']),
      sex: getFirst(named['Sex']),
      age: getFirst(named['Age']),
      dob: getFirst(named['Date of Birth']),
      phone: getFirst(named['Phone Number(s)']),
      email: getFirst(named['Email']),
      district: getFirst(named['Home District']),
      village: getFirst(named['Village']),
      ta: getFirst(named['Traditional Authority (T/A)']),
      marital: getFirst(named['Marital Status']),
      qual: getFirst(named['Highest Qualification']),
      nationality: getFirst(named['Nationality']),
      denomination: getFirst(named['Denomination']),
      pg_name: getFirst(named['Parent / Guardian Name']),
      pg_phone: getFirst(named['Parent / Guardian Phone Number']),
      pg_occupation: getFirst(named['Parent / Guardian Occupation'])
    };
    // Build Google Doc
    var doc = DocumentApp.create('Application - ' + (data.fullName || 'Unnamed'));
    var body = doc.getBody();
    body.appendParagraph('UNIFY COLLEGE OF HOSPITALITY').setHeading(DocumentApp.ParagraphHeading.HEADING1);
    body.appendParagraph('Student Application Form').setHeading(DocumentApp.ParagraphHeading.HEADING2);
    body.appendParagraph('Date: ' + new Date().toLocaleString());
    body.appendHorizontalRule();
    body.appendParagraph('PERSONAL INFORMATION').setHeading(DocumentApp.ParagraphHeading.HEADING3);
    for (var k in data){
      if (data[k]) body.appendParagraph(k + ': ' + data[k]);
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
    var pdfBlob = DriveApp.getFileById(doc.getId()).getAs('application/pdf').setName((data.fullName||'application') + '.pdf');
    var saved = DriveApp.createFile(pdfBlob);
    saved.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    var fileId = saved.getId();
    var downloadUrl = 'https://drive.google.com/uc?export=download&id=' + fileId;
    // Email the applicant with the download link and WhatsApp link
    var applicantEmail = data.email;
    var whatsappNumber = '265990835561';
    var waMessage = encodeURIComponent('APPLICATION FORM\nStudent Name: ' + (data.fullName||'') + '\n\nDownload Filled Application (PDF):\n' + downloadUrl);
    var waLink = 'https://wa.me/' + whatsappNumber + '?text=' + waMessage;
    var subject = 'Your Unify College Application PDF';
    var bodyText = 'Dear ' + (data.fullName||'Applicant') + ',\n\nThank you for applying. Download your filled application here:\n' + downloadUrl + '\n\nOpen WhatsApp chat: ' + waLink + '\n\nRegards,\nUnify College of Hospitality';
    if (applicantEmail){
      MailApp.sendEmail(applicantEmail, subject, bodyText);
    }
    // Optionally email admissions office
    MailApp.sendEmail('info.unifycollegeofhospitality@gmail.com', 'New Application: ' + (data.fullName||''), 'A new application was submitted. Download: ' + downloadUrl);
  }catch(err){
    Logger.log('onFormSubmit error: ' + err.toString());
  }
}
function getFirst(arr){
  if (!arr) return '';
  return Array.isArray(arr) ? arr[0] : arr;
}