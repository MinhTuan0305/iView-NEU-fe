export async function POST(_request: Request) {
  // Demo-only: acknowledge submission and return a mock log id
  return Response.json({ queued: true, log_file: 'demo_log_id' });
}
