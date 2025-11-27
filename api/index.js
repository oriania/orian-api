import OpenAI from "openai";
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Rota principal da API ORIAN IA
app.post("/api/orian", async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await client.chat.completions.create({
      model: "gpt-5.1-mini",
      messages: [
        { role: "system", content: "Você é o ORIAN IA, uma inteligência empática, sábia e futurista." },
        { role: "user", content: message }
      ]
    });

    res.json({
      reply: completion.choices[0].message.content
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro no servidor ORIAN IA." });
  }
});

// Porta para rodar localmente
app.listen(3000, () => console.log("ORIAN API rodando localmente"));
