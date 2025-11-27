import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(express.json());
app.use(cors());

// Cliente OpenAI usando variável da Vercel
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Rota principal da API ORIAN IA
app.post("/api/orian", async (req, res) => {
  try {
    const { mensagem } = req.body;

    const completion = await client.chat.completions.create({
      model: "gpt-5.1",
      messages: [
        {
          role: "system",
          content:
            "Você é o ORIAN IA, uma inteligência empática, futurista, amigável e muito sábia."
        },
        {
          role: "user",
          content: mensagem
        }
      ]
    });

    res.json({
      resposta: completion.choices[0].message.content
    });
  } catch (erro) {
    console.error("Erro ORIAN IA:", erro);
    res.status(500).json({ erro: "Erro no servidor ORIAN IA." });
  }
});

// Rota de teste
app.get("/", (req, res) => {
  res.json({ status: "API ORIAN IA online 🚀" });
});

// Porta local (não usada na Vercel)
export default app;

