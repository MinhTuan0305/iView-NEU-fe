export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_: Request, ctx: { params: Promise<{ filename: string }> | { filename: string } }) {
  // Demo-only: return a mock evaluation result
  const p: any = (typeof (ctx as any).params?.then === 'function') ? await (ctx as any).params : (ctx as any).params;
  const name = (p.filename as string) || 'demo_result.json';
  const data = {
    filename: name,
    overall_score: 7.8,
    summary: 'Ứng viên thể hiện kỹ năng tốt, giao tiếp rõ ràng, tiềm năng phù hợp.',
    scores: {
      correctness: 8.0,
      coverage: 7.5,
      reasoning: 7.5,
      creativity: 7.0,
      communication: 8.5,
      attitude: 8.0
    },
    details: [
      { question_id: 1, score: 8.0, notes: 'Giới thiệu rõ ràng, mục tiêu hợp lý.' },
      { question_id: 2, score: 7.5, notes: 'Mô tả thử thách có chiều sâu, cách giải quyết hợp lý.' },
      { question_id: 3, score: 7.0, notes: 'Nêu các nguyên tắc kiến trúc cơ bản, có ví dụ.' }
    ]
  };
  return Response.json(data);
}
