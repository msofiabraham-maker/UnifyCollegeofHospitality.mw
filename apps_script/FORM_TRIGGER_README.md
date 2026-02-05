Google Form Trigger — Setup & Notes

This file describes how to use the provided `FormTrigger.gs` script to generate PDFs on Google Form submission.

Steps:
1. Create a Google Form with fields (recommended exact titles):
   - Full Name(s)
   - Sex
   - Age
   - Date of Birth
   - Phone Number(s)
   - Email
   - Home District
   - Village
   - Traditional Authority (T/A)
   - Marital Status
   - Highest Qualification
   - Nationality
   - Denomination
   - Parent / Guardian Name
   - Parent / Guardian Phone Number
   - Parent / Guardian Occupation

2. Open https://script.google.com/ while signed in as `info.unifycollegeofhospitality@gmail.com` and create a new Apps Script project.
3. Add the `FormTrigger.gs` file contents (already provided in this repo) to the project.
4. In the Apps Script editor, create an installable trigger: `Triggers` → `Add Trigger`:
   - Function: `onFormSubmit`
   - Event source: `From form`
   - Event type: `On form submit`
5. Authorize required scopes when prompted (Drive, Mail, Docs).

Behavior:
- On each form submission the script creates a Google Doc containing the applicant's details and the full Student Code of Conduct, exports it to PDF, saves it in the Drive account that owns the script, sets sharing to "Anyone with link", and emails the applicant the forced-download link and a WhatsApp link containing that download URL in the message text.

Limitations:
- Google Forms confirmation page cannot be customized per-submission, so the script emails the applicant the download link instead of redirecting the submitter immediately to WhatsApp. If you need an immediate redirect to WhatsApp, use the Web App (`Code.gs`) POST flow instead.
- Ensure you create and run the script while signed in as `info.unifycollegeofhospitality@gmail.com` so generated PDFs are saved to that Drive account.

Security note:
- The script sets file sharing to "Anyone with link" so that `https://drive.google.com/uc?export=download&id=FILE_ID` works without requiring sign-in. Adjust sharing to fit your privacy requirements.