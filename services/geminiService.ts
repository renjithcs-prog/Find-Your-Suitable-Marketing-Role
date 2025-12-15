import { GoogleGenAI, Type } from "@google/genai";
import { RoleType } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface CareerDetails {
  tools: string[];
  salary: string;
  advice: string;
}

export const getCareerDetails = async (role: RoleType): Promise<CareerDetails> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      You are an expert career counselor for Digital Marketing in India.
      The user matched with the role: "${role}".
      
      Return a JSON object with:
      1. 'tools': An array of 5 specific AI & industry tools they must master for this role (e.g., ChatGPT, Jasper, Google Ads, Semrush, Canva).
      2. 'salary': The approximate annual salary range in Indian Rupees (INR) for a fresher to mid-level professional (e.g., "₹4,00,000 - ₹8,00,000 / year").
      3. 'advice': A short, punchy 1-sentence advice on how to get hired.

      Do not include markdown code blocks, just the raw JSON.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tools: { type: Type.ARRAY, items: { type: Type.STRING } },
            salary: { type: Type.STRING },
            advice: { type: Type.STRING },
          },
          required: ["tools", "salary", "advice"],
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as CareerDetails;

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback data
    return {
      tools: ["ChatGPT", "Google Analytics", "Canva", "Excel", "HubSpot"],
      salary: "₹3,50,000 - ₹7,00,000 / year",
      advice: "Build a portfolio to showcase your real-world skills."
    };
  }
};