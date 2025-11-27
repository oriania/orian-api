import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido. Use POST." });
  }

  try {
    const { mensagem } = req.body;

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await client.chat.completions.create({
      model: "gpt-5.1",
      messages: [
        {
          role: "system",
          content:
            "Você é ORIAN IA, uma inteligência futurista, empática, motivadora e muito sábia. Responda sempre com carinho e clareza.",
        },
        {
          role: "user",
          content: mensagem,
        },
      ],
    });

    return res.status(200).json({
      resposta: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("ERRO ORIAN:", error);
    return res.status(500).json({
      error: "Erro interno na IA ORIAN.",
      detalhes: error.message,
    });
  }
}
