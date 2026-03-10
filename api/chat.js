export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const OPENAI_KEY = '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';

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: { message: err.message } });
  }
}
