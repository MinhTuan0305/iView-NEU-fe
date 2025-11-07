import { NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_req: NextRequest, ctx: { params: Promise<{ filename: string }> | { filename: string } }) {
  // Demo-only: return static questions
  const p = (ctx.params as any);
  const { filename } = typeof p.then === 'function' ? await (p as Promise<{ filename: string }>) : (p as { filename: string });
  const data = {
    filename,
    questions: [
      { id: 1, text: 'Giới thiệu bản thân và mục tiêu nghề nghiệp?' },
      { id: 2, text: 'Kể về một thử thách kỹ thuật bạn đã giải quyết.' },
      { id: 3, text: 'Bạn thường thiết kế kiến trúc cho dự án như thế nào?' },
      { id: 4, text: 'Mô tả quy trình debug một lỗi khó.' },
      { id: 5, text: 'Bạn ưu tiên chất lượng code ra sao trong deadline gấp?' },
      { id: 6, text: 'Giải thích một pattern bạn hay dùng và lý do.' },
      { id: 7, text: 'Ví dụ về tối ưu performance bạn từng làm.' },
      { id: 8, text: 'Cách bạn làm việc nhóm và chia sẻ kiến thức.' },
      { id: 9, text: 'Dự án tự hào nhất và đóng góp của bạn.' }
    ]
  };
  return Response.json(data);
}

