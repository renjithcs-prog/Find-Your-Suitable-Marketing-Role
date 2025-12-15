import { UtmParams } from '../types';

export interface SignupData extends UtmParams {
  name: string;
  phone: string;
  language: string;
}

// ==============================================================================
// 🚀 GOOGLE SHEET SETUP INSTRUCTIONS
// ==============================================================================
// 1. Create a new Google Sheet.
// 2. Add these headers in Row 1: 
//    date | time | name | phone | language | utm_source | utm_medium | utm_campaign | utm_term | utm_content
//
// 3. Go to Extensions > Apps Script.
// 4. Paste the 'doPost' code provided in the chat.
// 5. Click "Deploy" > "New deployment".
// 6. Select type: "Web app".
// 7. Execute as: "Me".
// 8. Who has access: "Anyone" (⚠️ IMPORTANT: Must be 'Anyone', not 'Anyone with Google Account').
// 9. Click "Deploy", authorize the script, and copy the "Web app URL".
// 10. Paste the URL below inside the quotes.
// ==============================================================================

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKdzbdFPAiBNYy-qEbaWTzKxgCJi0VZVNP0qDOzqkx1sWyPrfMF2zi9kPaZM3bsjN_Kw/exec';

export const submitToGoogleSheet = async (data: SignupData): Promise<boolean> => {
  // Check if the URL is still the placeholder
  if (GOOGLE_SCRIPT_URL.includes('REPLACE_WITH_YOUR_SCRIPT_URL')) {
    alert("⚠️ SETUP REQUIRED: You need to paste your Google Sheet Web App URL in 'services/sheetService.ts' for the data to be saved.");
    console.error("⚠️ Google Sheet URL is missing. Data was NOT saved.");
    return true; // Return true to let the user proceed to result screen even if dev setup is incomplete
  }

  // using URLSearchParams is often more reliable for Apps Script text data than FormData
  const params = new URLSearchParams();
  params.append('name', data.name);
  params.append('phone', data.phone);
  params.append('language', data.language);
  
  // Add Timestamp
  params.append('date', new Date().toLocaleDateString());
  params.append('time', new Date().toLocaleTimeString());

  // Add UTM Parameters
  if (data.utm_source) params.append('utm_source', data.utm_source);
  if (data.utm_medium) params.append('utm_medium', data.utm_medium);
  if (data.utm_campaign) params.append('utm_campaign', data.utm_campaign);
  if (data.utm_term) params.append('utm_term', data.utm_term);
  if (data.utm_content) params.append('utm_content', data.utm_content);

  try {
    // 'no-cors' is required for Google Apps Script to work from a browser client
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: params,
      mode: 'no-cors' 
    });
    return true;
  } catch (error) {
    console.error("Error submitting to Google Sheet:", error);
    return false; 
  }
};