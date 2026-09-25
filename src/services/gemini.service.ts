import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

const SYSTEM_INSTRUCTION = `
Kamu adalah asisten keuangan pribadi untuk aplikasi My Kantong.
ATURAN KETAT:
- Kamu HANYA membahas topik keuangan pribadi: pengeluaran, pemasukkan, budgeting, tabungan, kategori transaksi, dan analisis pola belanja.
- Jika diminta hal di luar topik ini, tolak dengan sopan dan arahkan kembali ke topik keuangan.
- Jawaban singkat (2-4 kalimat), actionable, dalam Bahasa Indonesia.
- JANGAN mengarang atau mengubah angka. Hanya gunakan angka yang diberikan dalam data.
`;

export class GeminiService {
  static generaticChartInsight = async (label: string, chartData: unknown) => {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flase",
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    const prompt = `
    Berikut data ${label} (dalam Rupiah):
    ${JSON.stringify(chartData)}
    
    Berikan insight singkat: tren/nilai tertinggi-terendah, dan satu saran praktis untuk pengguna.
    `;

    const result = await model.generateContentStream(prompt);
    return (await result.response).text();
  };
}
