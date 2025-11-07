'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface StudentSubmission {
  id: string;
  studentName: string;
  studentId: string;
  submittedAt: string;
  overallScore: number;
  scores: {
    correctness: number;
    coverage: number;
    reasoning: number;
    creativity: number;
    communication: number;
    attitude: number;
  };
  answers: Array<{
    questionId: number;
    question: string;
    answer: string;
    score: number;
    feedback: string;
  }>;
  overallFeedback: {
    strengths: string;
    weaknesses: string;
    recommendation: string;
  };
}

interface Exam {
  id: string;
  name: string;
  subject: string;
  startDate: string;
  endDate: string;
  studentCount: number;
  status: 'ended' | 'ongoing' | 'upcoming';
}

export default function ReviewPage() {
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([
    {
      id: '1',
      studentName: 'Nguyễn Văn A',
      studentId: 'SV001',
      submittedAt: '2025-11-05T14:30:00Z',
      overallScore: 7.8,
      scores: {
        correctness: 8.0,
        coverage: 7.5,
        reasoning: 7.5,
        creativity: 7.0,
        communication: 8.5,
        attitude: 8.0
      },
      answers: [
        {
          questionId: 1,
          question: 'Giới thiệu bản thân và mục tiêu nghề nghiệp?',
          answer: 'Tôi là sinh viên năm 3, muốn trở thành một nhà phân tích dữ liệu...',
          score: 8.0,
          feedback: 'Giới thiệu rõ ràng, mục tiêu hợp lý.'
        },
        {
          questionId: 2,
          question: 'Kể về một thử thách kỹ thuật bạn đã giải quyết.',
          answer: 'Trong dự án cuối kỳ, tôi gặp vấn đề với việc xử lý dữ liệu lớn...',
          score: 7.5,
          feedback: 'Mô tả thử thách có chiều sâu, cách giải quyết hợp lý.'
        }
      ],
      overallFeedback: {
        strengths: 'Giao tiếp tốt, có kiến thức cơ bản vững chắc.',
        weaknesses: 'Cần cải thiện khả năng phân tích sâu hơn.',
        recommendation: 'Nên tiếp tục phát triển kỹ năng phân tích và tư duy phản biện.'
      }
    },
    {
      id: '2',
      studentName: 'Trần Thị B',
      studentId: 'SV002',
      submittedAt: '2025-11-05T15:00:00Z',
      overallScore: 8.5,
      scores: {
        correctness: 9.0,
        coverage: 8.5,
        reasoning: 8.5,
        creativity: 8.0,
        communication: 8.5,
        attitude: 8.5
      },
      answers: [
        {
          questionId: 1,
          question: 'Giới thiệu bản thân và mục tiêu nghề nghiệp?',
          answer: 'Tôi là sinh viên năm cuối, có kinh nghiệm thực tập tại công ty ABC...',
          score: 9.0,
          feedback: 'Giới thiệu chuyên nghiệp, mục tiêu rõ ràng và có kế hoạch cụ thể.'
        }
      ],
      overallFeedback: {
        strengths: 'Kiến thức sâu, có kinh nghiệm thực tế.',
        weaknesses: 'Có thể cải thiện khả năng trình bày.',
        recommendation: 'Ứng viên xuất sắc, phù hợp với vị trí.'
      }
    }
  ]);

  const [editingSubmission, setEditingSubmission] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<{ submissionId: string; type: 'score' | 'feedback'; questionId?: number; scoreType?: string } | null>(null);

  // Danh sách các buổi thi đã kết thúc
  const exams: Exam[] = [
    { 
      id: '1', 
      name: 'Giữa kỳ - Kinh tế vi mô', 
      subject: 'Kinh tế vi mô',
      startDate: '2025-10-25T08:00:00Z',
      endDate: '2025-10-25T10:00:00Z',
      studentCount: 15,
      status: 'ended'
    },
    { 
      id: '2', 
      name: 'Cuối kỳ - Kinh tế lượng', 
      subject: 'Kinh tế lượng',
      startDate: '2025-12-20T08:00:00Z',
      endDate: '2025-12-20T10:00:00Z',
      studentCount: 8,
      status: 'ended'
    },
    {
      id: '3',
      name: 'Giữa kỳ - Tài chính doanh nghiệp',
      subject: 'Tài chính doanh nghiệp',
      startDate: '2025-11-15T08:00:00Z',
      endDate: '2025-11-15T10:00:00Z',
      studentCount: 12,
      status: 'ended'
    }
  ];

  // Lọc chỉ các buổi thi đã kết thúc
  const endedExams = exams.filter(exam => exam.status === 'ended');

  const handleEditScore = (submissionId: string, questionId: number, newScore: number) => {
    setSubmissions(prev => prev.map(sub => {
      if (sub.id === submissionId) {
        const updatedAnswers = sub.answers.map(ans => 
          ans.questionId === questionId ? { ...ans, score: newScore } : ans
        );
        // Recalculate overall score
        const avgScore = updatedAnswers.reduce((sum, ans) => sum + ans.score, 0) / updatedAnswers.length;
        return { ...sub, answers: updatedAnswers, overallScore: avgScore };
      }
      return sub;
    }));
    setEditingField(null);
  };

  const handleEditFeedback = (submissionId: string, questionId: number, newFeedback: string) => {
    setSubmissions(prev => prev.map(sub => {
      if (sub.id === submissionId) {
        return {
          ...sub,
          answers: sub.answers.map(ans =>
            ans.questionId === questionId ? { ...ans, feedback: newFeedback } : ans
          )
        };
      }
      return sub;
    }));
    setEditingField(null);
  };

  const handleEditOverallFeedback = (submissionId: string, field: 'strengths' | 'weaknesses' | 'recommendation', value: string) => {
    setSubmissions(prev => prev.map(sub => {
      if (sub.id === submissionId) {
        return {
          ...sub,
          overallFeedback: { ...sub.overallFeedback, [field]: value }
        };
      }
      return sub;
    }));
    setEditingField(null);
  };

  const filteredSubmissions = selectedExamId 
    ? submissions.filter(s => s.id.startsWith(selectedExamId))
    : [];

  const selectedExam = selectedExamId 
    ? exams.find(e => e.id === selectedExamId)
    : null;

  const selectedSubmission = selectedSubmissionId
    ? submissions.find(s => s.id === selectedSubmissionId)
    : null;

  // Nếu chưa chọn buổi thi, hiển thị danh sách buổi thi
  if (!selectedExamId) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="max-w-6xl mx-auto px-5 py-10">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-[#0065ca] mb-2">Review Bài Thi</h1>
            <p className="text-[#5f6368]">Xem và sửa điểm, đáp án, nhận xét của các bài thi sinh viên</p>
          </div>

          {/* Danh sách các buổi thi đã kết thúc */}
          <div className="space-y-4">
            {endedExams.length === 0 ? (
              <div className="bg-white shadow-sm p-12 text-center">
                <p className="text-[#5f6368]">Chưa có buổi thi nào đã kết thúc</p>
              </div>
            ) : (
              endedExams.map((exam) => (
                <div 
                  key={exam.id} 
                  className="bg-white shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-[#0065ca]"
                  onClick={() => setSelectedExamId(exam.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#202124] mb-2">
                        {exam.name}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-[#5f6368]">
                        <div>
                          <span className="font-medium">Môn học:</span> {exam.subject}
                        </div>
                        <div>
                          <span className="font-medium">Thời gian:</span> {new Date(exam.startDate).toLocaleDateString('vi-VN')} - {new Date(exam.endDate).toLocaleDateString('vi-VN')}
                        </div>
                        <div>
                          <span className="font-medium">Số sinh viên đã thi:</span> {exam.studentCount}
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 flex items-center">
                      <button className="px-6 py-2 bg-[#0065ca] text-white font-semibold hover:bg-[#004a95] transition-colors">
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // Nếu đã chọn buổi thi nhưng chưa chọn sinh viên, hiển thị danh sách sinh viên
  if (selectedExamId && !selectedSubmissionId) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="max-w-6xl mx-auto px-5 py-10">
          <div className="mb-8">
            <button
              onClick={() => setSelectedExamId(null)}
              className="mb-4 text-[#0065ca] hover:underline flex items-center gap-2"
            >
              <span>←</span> Quay lại danh sách buổi thi
            </button>
            <h1 className="text-3xl font-semibold text-[#0065ca] mb-2">
              {selectedExam?.name}
            </h1>
            <p className="text-[#5f6368]">
              Danh sách sinh viên đã hoàn thành bài thi
            </p>
          </div>

          {/* Danh sách sinh viên */}
          <div className="space-y-4">
            {filteredSubmissions.length === 0 ? (
              <div className="bg-white shadow-sm p-12 text-center">
                <p className="text-[#5f6368]">Chưa có sinh viên nào hoàn thành bài thi</p>
              </div>
            ) : (
              filteredSubmissions.map((submission) => (
                <div 
                  key={submission.id} 
                  className="bg-white shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-[#0065ca]"
                  onClick={() => setSelectedSubmissionId(submission.id)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#202124] mb-2">
                        {submission.studentName} ({submission.studentId})
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#5f6368]">
                        <div>
                          <span className="font-medium">Thời gian nộp:</span> {new Date(submission.submittedAt).toLocaleString('vi-VN')}
                        </div>
                        <div>
                          <span className="font-medium">Số câu hỏi:</span> {submission.answers.length} câu
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-3xl font-bold text-[#0065ca]">
                          {submission.overallScore.toFixed(1)}/10
                        </div>
                        <p className="text-xs text-[#5f6368]">Điểm tổng</p>
                      </div>
                      <button className="px-6 py-2 bg-[#0065ca] text-white font-semibold hover:bg-[#004a95] transition-colors">
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // Hiển thị chi tiết sinh viên đã chọn
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-5 py-10">
        <div className="mb-8">
          <button
            onClick={() => setSelectedSubmissionId(null)}
            className="mb-4 text-[#0065ca] hover:underline flex items-center gap-2"
          >
            <span>←</span> Quay lại danh sách sinh viên
          </button>
          <h1 className="text-3xl font-semibold text-[#0065ca] mb-2">
            {selectedSubmission?.studentName} ({selectedSubmission?.studentId})
          </h1>
          <p className="text-[#5f6368]">
            {selectedExam?.name} • Nộp bài: {selectedSubmission ? new Date(selectedSubmission.submittedAt).toLocaleString('vi-VN') : ''}
          </p>
        </div>

        {selectedSubmission && (
          <div className="bg-white shadow-sm p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-semibold text-[#202124] mb-2">
                  Kết quả tổng quan
                </h3>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-[#0065ca]">
                  {selectedSubmission.overallScore.toFixed(1)}/10
                </div>
                <p className="text-xs text-[#5f6368]">Điểm tổng</p>
              </div>
            </div>

            {/* Scores Breakdown */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {Object.entries(selectedSubmission.scores).map(([key, value]) => (
                <div key={key} className="p-3 bg-gray-50 ">
                  <div className="text-xs text-[#5f6368] uppercase">{key}</div>
                  <div className="text-lg font-semibold">{value.toFixed(1)}</div>
                </div>
              ))}
            </div>

            {/* Answers */}
            <div className="space-y-4 mb-6">
              <h4 className="font-semibold text-[#202124]">Câu trả lời chi tiết</h4>
              {selectedSubmission.answers.map((answer) => (
                <div key={answer.questionId} className="border border-gray-200  p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium text-[#202124]">
                      Câu {answer.questionId}: {answer.question}
                    </h5>
                    <div className="flex items-center gap-2">
                      {editingField?.submissionId === selectedSubmission.id && editingField?.type === 'score' && editingField?.questionId === answer.questionId ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            max="10"
                            step="0.1"
                            defaultValue={answer.score}
                            onBlur={(e) => handleEditScore(selectedSubmission.id, answer.questionId, parseFloat(e.target.value))}
                            className="w-20 px-2 py-1 border border-gray-300  text-sm"
                            autoFocus
                          />
                          <button
                            onClick={() => setEditingField(null)}
                            className="text-xs text-gray-500"
                          >
                            Hủy
                          </button>
                        </div>
                      ) : (
                        <>
                          <span className="font-semibold text-[#0065ca]">{answer.score.toFixed(1)}/10</span>
                          <button
                            onClick={() => setEditingField({ submissionId: selectedSubmission.id, type: 'score', questionId: answer.questionId })}
                            className="text-xs text-[#0065ca] hover:underline"
                          >
                            Sửa
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-[#5f6368] mb-2">{answer.answer}</p>
                  <div className="mt-2">
                    {editingField?.submissionId === selectedSubmission.id && editingField?.type === 'feedback' && editingField?.questionId === answer.questionId ? (
                      <div>
                        <textarea
                          defaultValue={answer.feedback}
                          onBlur={(e) => handleEditFeedback(selectedSubmission.id, answer.questionId, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300  text-sm"
                          rows={2}
                          autoFocus
                        />
                        <button
                          onClick={() => setEditingField(null)}
                          className="text-xs text-gray-500 mt-1"
                        >
                          Hủy
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-between items-start">
                        <p className="text-sm text-[#5f6368] italic">{answer.feedback}</p>
                        <button
                          onClick={() => setEditingField({ submissionId: selectedSubmission.id, type: 'feedback', questionId: answer.questionId })}
                          className="text-xs text-[#0065ca] hover:underline ml-2"
                        >
                          Sửa
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Overall Feedback */}
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-semibold text-[#202124] mb-3">Nhận xét tổng thể</h4>
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-[#202124]">Điểm mạnh:</label>
                  {editingField?.submissionId === selectedSubmission.id && editingField?.type === 'feedback' && editingField?.questionId === undefined && editingField?.scoreType === 'strengths' ? (
                    <textarea
                      defaultValue={selectedSubmission.overallFeedback.strengths}
                      onBlur={(e) => handleEditOverallFeedback(selectedSubmission.id, 'strengths', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300  text-sm mt-1"
                      rows={2}
                      autoFocus
                    />
                  ) : (
                    <div className="flex justify-between items-start">
                      <p className="text-sm text-[#5f6368]">{selectedSubmission.overallFeedback.strengths}</p>
                      <button
                        onClick={() => setEditingField({ submissionId: selectedSubmission.id, type: 'feedback', scoreType: 'strengths' })}
                        className="text-xs text-[#0065ca] hover:underline ml-2"
                      >
                        Sửa
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-[#202124]">Điểm cần cải thiện:</label>
                  {editingField?.submissionId === selectedSubmission.id && editingField?.type === 'feedback' && editingField?.questionId === undefined && editingField?.scoreType === 'weaknesses' ? (
                    <textarea
                      defaultValue={selectedSubmission.overallFeedback.weaknesses}
                      onBlur={(e) => handleEditOverallFeedback(selectedSubmission.id, 'weaknesses', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300  text-sm mt-1"
                      rows={2}
                      autoFocus
                    />
                  ) : (
                    <div className="flex justify-between items-start">
                      <p className="text-sm text-[#5f6368]">{selectedSubmission.overallFeedback.weaknesses}</p>
                      <button
                        onClick={() => setEditingField({ submissionId: selectedSubmission.id, type: 'feedback', scoreType: 'weaknesses' })}
                        className="text-xs text-[#0065ca] hover:underline ml-2"
                      >
                        Sửa
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-[#202124]">Khuyến nghị:</label>
                  {editingField?.submissionId === selectedSubmission.id && editingField?.type === 'feedback' && editingField?.questionId === undefined && editingField?.scoreType === 'recommendation' ? (
                    <textarea
                      defaultValue={selectedSubmission.overallFeedback.recommendation}
                      onBlur={(e) => handleEditOverallFeedback(selectedSubmission.id, 'recommendation', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300  text-sm mt-1"
                      rows={2}
                      autoFocus
                    />
                  ) : (
                    <div className="flex justify-between items-start">
                      <p className="text-sm text-[#5f6368]">{selectedSubmission.overallFeedback.recommendation}</p>
                      <button
                        onClick={() => setEditingField({ submissionId: selectedSubmission.id, type: 'feedback', scoreType: 'recommendation' })}
                        className="text-xs text-[#0065ca] hover:underline ml-2"
                      >
                        Sửa
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

