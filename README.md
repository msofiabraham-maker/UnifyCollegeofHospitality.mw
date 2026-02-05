# UNIFY COLLEGE OF HOSPITALITY — Online Application (Local Files)

This repository contains the website front-end and a Google Apps Script example to generate a filled PDF, save it to Google Drive, and return a forced download link.

Quick steps:
1. Place `icon.jpg` and `Background.jpg` in `/assets`.
2. Deploy the Apps Script in `/apps_script/Code.gs` as a Web App (run as the Drive owner account `info.unifycollegeofhospitality@gmail.com`) and copy the Web App URL.
3. Replace `REPLACE_WITH_YOUR_APPS_SCRIPT_WEBAPP_URL` in `/js/main.js` with the deployed Web App URL.
4. Host the `index.html` and `apply.html` on GitHub Pages / Netlify (static site). The form will POST to the Apps Script which generates the PDF and returns the forced download link.

See `/apps_script/README.md` and `/apps_script/FORM_TRIGGER_README.md` for Apps Script deployment & permission instructions.