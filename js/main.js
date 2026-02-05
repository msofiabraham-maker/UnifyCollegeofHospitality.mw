// Replace this with your deployed Apps Script web app URL
const APPS_SCRIPT_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbxBWiyAIBtT_H56UZOhO62B2oDT8vRS-yMJNlMryJUXk7ba0zD8_QQX2aYrNb7rz6pviQ/exec';
const WHATSAPP_NUMBER = '265990835561';

document.getElementById('appForm').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const form = e.target;
  const data = {};
  new FormData(form).forEach((v,k)=>{
    // handle multiple checkboxes with same name
    if (data[k]){
      if (Array.isArray(data[k])) data[k].push(v); else data[k]=[data[k],v];
    } else data[k]=v;
  });

  try{
    const res = await fetch(APPS_SCRIPT_WEBAPP_URL, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    });
    const json = await res.json();
    const downloadLink = json.downloadUrl;
    const fullName = data.fullName || '';
    const message = encodeURIComponent(`APPLICATION FORM\nStudent Name: ${fullName}\n\nDownload Filled Application (PDF):\n${downloadLink}`);
    // Redirect to WhatsApp
    window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  }catch(err){
    alert('Submission failed. Please try again later.');
    console.error(err);
  }
});