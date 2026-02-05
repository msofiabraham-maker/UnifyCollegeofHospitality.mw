Apps Script setup

1. Open https://script.google.com/ and create a new project while signed in as the Drive owner account: info.unifycollegeofhospitality@gmail.com
2. Paste the contents of `Code.gs` into the editor.
3. In the Apps Script editor, go to `Deploy` → `New deployment` → Select `Web app`.
   - Execute as: `Me` (this will run as the account that owns the script)
   - Who has access: `Anyone`
4. Deploy and copy the Web App URL. Paste it into `/js/main.js` replacing `REPLACE_WITH_YOUR_APPS_SCRIPT_WEBAPP_URL`.
5. Make sure the account has Drive storage and that the script has Drive permissions (it will ask on first run).
6. Ownership requirement: to ensure PDFs are stored in `info.unifycollegeofhospitality@gmail.com` Drive, deploy/run the script while logged in as that account. If you deploy under another account, either transfer ownership of the saved files manually or re-deploy while signed in as `info.unify...`.

Security note: setting sharing to `Anyone with link` is necessary for forced-download links to work without sign-in. Adjust to your privacy policy.