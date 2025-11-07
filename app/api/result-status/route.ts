export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const log = searchParams.get('log') || 'demo_log_id';
  // Demo-only: immediately return done=true with a mock result filename
  return Response.json({ log, done: true, result: 'demo_result.json' });
}
