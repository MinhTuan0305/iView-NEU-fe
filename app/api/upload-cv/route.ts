// Next.js API route to proxy requests to Flask backend
// Avoids CORS, captures Flask redirect, and provides useful error info

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(_request: Request) {
  // Demo-only: pretend upload succeeded and return a mock questions filename
  return Response.json({ filename: 'demo.questions.json' });
}

