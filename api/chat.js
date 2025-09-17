export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.status(405).send("Method Not Allowed");
      return;
    }
    const base = process.env.OLLAMA_BASE_URL; // e.g. https://xxx.trycloudflare.com
    if (!base) {
      res.status(500).send("Missing OLLAMA_BASE_URL");
      return;
    }
    const { messages, system, model, stream } = req.body || {};

    const upstream = await fetch(`${base}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: model || process.env.OLLAMA_MODEL || "qwen2.5:3b-instruct",
        stream: stream ?? true,
        messages: [
          ...(system ? [{ role: "system", content: system }] : []),
          ...(messages || []),
        ],
      }),
    });

    if (!upstream.ok || !upstream.body) {
      res.status(502).send(`Upstream error: ${upstream.status}`);
      return;
    }

    // Pass NDJSON through 1:1
    res.setHeader("Content-Type", "application/x-ndjson");
    res.setHeader("Cache-Control", "no-store");

    // Stream chunks to client
    for await (const chunk of upstream.body) {
      res.write(chunk);
    }
    res.end();
  } catch (e) {
    res.status(500).send(`Proxy error: ${e?.message || "unknown"}`);
  }
}
