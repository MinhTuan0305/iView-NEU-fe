export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  // Demo-only: return a list of mock results
  const data = [
    { filename: 'demo_result.json', created_at: '2025-11-06T09:00:00Z' },
    { filename: 'demo_result_prev.json', created_at: '2025-11-05T09:00:00Z' }
  ];
  return Response.json(data);
}
