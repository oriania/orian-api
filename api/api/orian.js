import OpenAI from "openai";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido. Use POST." });
  }

  try {
    const { message } = req.body;  // <-- AQUI AGORA ESTÁ "message"

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Campo 'message' obrigatório e deve ser texto."
      });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const completion = await client.chat.completions.create({
      model: "gpt-5.1-mini",
      messages: [
        {
          role: "system",
          content: "Você é ORIAN IA, uma inteligência futurista, empática, motivadora e muito sábia. Responda sempre com carinho e clareza."
        },
        {
          role: "user",
          content: message   // <-- USANDO message CORRETAMENTE
        }
      ]
    });

    return res.status(200).json({
      response: completion.choices[0].message.content,
    });

  } catch (erro) {
    console.error("ERRO ORIAN:", erro);
    return res.status(500).json({
      error: "Erro interno na IA ORIAN.",
      details: erro.message,
    });
  }
}
