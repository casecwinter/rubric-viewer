// Vercel Serverless Function: password validation
// Set RUBRIC_PASSWORD environment variable in Vercel dashboard

export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body || {};
  const correctPassword = process.env.RUBRIC_PASSWORD;

  if (!correctPassword) {
    return res.status(500).json({ error: 'Server misconfigured: no password set' });
  }

  if (password === correctPassword) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ error: 'Incorrect password' });
  }
}
