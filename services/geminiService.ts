import { GoogleGenAI } from "@google/genai";
import { ReportData } from "../types";

// In a real app, this would be a secure environment variable. 
// For this demo, we assume process.env.API_KEY is available.
const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey: apiKey });

export const getParentingAdvice = async (question: string, reportContext: ReportData): Promise<string> => {
  if (!apiKey) {
    return "请配置 API KEY 以使用 AI 助手功能。";
  }

  try {
    const contextString = JSON.stringify(reportContext);
    
    const prompt = `
      You are an expert child psychologist and the AI persona "醒醒机器人" (Xing Xing Robot).
      
      Here is the weekly psychological analysis report for the child "Xiao Xing":
      ${contextString}

      The parent has asked the following question: "${question}"

      Please provide a warm, professional, and actionable answer based on the report data provided. 
      Keep the answer under 200 words. Use Chinese. 
      Focus on positive reinforcement and practical steps.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "抱歉，我现在无法回答这个问题，请稍后再试。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI 服务暂时不可用。";
  }
};