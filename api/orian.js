import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST." });
  }

  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const { mensagem } = req.body;

    const completion = await client.chat.completions.create({
      model: "gpt-5.1",
      messages: [
        {
          role: "system",
          content: "Você é o ORIAN IA, uma inteligência empática, futurista, amigável e muito sábia."
        },
        {
          role: "user",
          content: mensagem
        }
      ]
    });

    res.status(200).json({
      resposta: completion.choices[0].message.content
    });

  } catch (error) {
    res.status(500).json({
      error: "Erro interno na ORIAN IA",
      detalhe: error.message
    });
  }
}
