import { GoogleGenerativeAI } from "@google/generative-ai";
import { retryWithBackouff } from "../utils/retry";

let genAI: GoogleGenerativeAI | null = null;

export function getGenAI() {
  if (!genAI) {
    if (!process.env.GEMINI_API_KEY) {
      throw Error("GEMINI_API_KEY is missing, please check your .env");
    }
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return genAI;
}

const SYSTEM_INSTRUCTION = `
Kamu adalah asisten keuangan pribadi untuk aplikasi My Kantong.
ATURAN KETAT:
- Kamu HANYA membahas topik keuangan pribadi: pengeluaran, pemasukkan, budgeting, tabungan, kategori transaksi, dan analisis pola belanja.
- Jika diminta hal di luar topik ini, tolak dengan sopan dan arahkan kembali ke topik keuangan.
- Jawaban singkat (2-4 kalimat), actionable, dalam Bahasa Indonesia.
- JANGAN mengarang atau mengubah angka. Hanya gunakan angka yang diberikan dalam data.
`;

const PRIMARY_MODEL = "gemini-3.8-flash";
const FALLBACK_MODEL = "gemini-3.5-flash-lite";

export class GeminiService {
  static generaticChartInsight = async (label: string, chartData: unknown) => {
    const prompt = `
    Berikut data ${label} (dalam Rupiah):
    ${JSON.stringify(chartData)}
    
    Berikan insight singkat: tren/nilai tertinggi-terendah, dan satu saran praktis untuk pengguna.
    `;

    async function callModel(modelName: string) {
      const model = getGenAI().getGenerativeModel({
        model: modelName,
        systemInstruction: SYSTEM_INSTRUCTION,
      });

      const result = await model.generateContentStream(prompt);
      return (await result.response).text();
    }

    try {
      return await retryWithBackouff(() => callModel(PRIMARY_MODEL), {
        maxRetries: 2,
        baseDelayMs: 800,
      });
    } catch (primaryError) {
      console.warn(
        `Primary model (${PRIMARY_MODEL}) failed, falling back...`,
        primaryError,
      );
      return await callModel(FALLBACK_MODEL);
    }
  };
}
