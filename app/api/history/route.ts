export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  // Demo-only: return mock interview history
  const data = [
    { id: 'demo-1', candidate_name: 'Nguyen Van A', created_at: '2025-11-05T14:00:00Z', result_file: 'demo_result_prev.json' },
    { id: 'demo-2', candidate_name: 'Tran Thi B', created_at: '2025-11-06T09:00:00Z', result_file: 'demo_result.json' }
  ];
  return Response.json(data);
}
