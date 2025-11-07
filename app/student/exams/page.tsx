'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';

interface Exam {
  id: string;
  subject: string;
  name: string;
  title: string;
  date: string;
  duration: string;
  type: string;
  password: string;
}

export default function ExamsPage() {
  const router = useRouter();
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [searchInput, setSearchInput] = useState('');
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const exams: Exam[] = [
    { id: '1', subject: 'kinhtevi', name: 'Giữa kỳ Kinh tế vi mô', title: 'Giữa kỳ - Kinh tế vi mô', date: '25/10/2025', duration: '10 phút', type: 'Giữa kỳ', password: 'KTVI2025' },
    { id: '2', subject: 'kinhteluong', name: 'Giữa kỳ Kinh tế lượng', title: 'Giữa kỳ - Kinh tế lượng', date: '10/11/2025', duration: '12 phút', type: 'Giữa kỳ', password: 'KTL2025' },
    { id: '3', subject: 'taichinhdn', name: 'Giữa kỳ Tài chính doanh nghiệp', title: 'Giữa kỳ - Tài chính doanh nghiệp', date: '05/11/2025', duration: '8 phút', type: 'Giữa kỳ', password: 'TC2025' },
    { id: '4', subject: 'kinhtevi', name: 'Cuối kỳ Kinh tế vi mô', title: 'Cuối kỳ - Kinh tế vi mô', date: '15/12/2025', duration: '15 phút', type: 'Cuối kỳ', password: 'CK2025' },
    { id: '5', subject: 'kinhteluong', name: 'Cuối kỳ Kinh tế lượng', title: 'Cuối kỳ - Kinh tế lượng', date: '20/12/2025', duration: '15 phút', type: 'Cuối kỳ', password: 'CK2025' },
  ];

  const filteredExams = exams.filter(exam => {
    const matchSubject = subjectFilter === 'all' || exam.subject === subjectFilter;
    const matchSearch = exam.name.toLowerCase().includes(searchInput.toLowerCase());
    return matchSubject && matchSearch;
  });

  const handleEnterExam = (exam: Exam) => {
    setSelectedExam(exam);
    setPassword('');
    setPasswordError('');
  };

  const handlePasswordSubmit = () => {
    if (!selectedExam) return;
    
    if (!password) {
      setPasswordError('Vui lòng nhập mật khẩu');
      return;
    }

    // Demo-only: check password
    if (password === selectedExam.password) {
      // Password correct - redirect to exam or show success
      alert(`Mật khẩu đúng! Vào kỳ thi: ${selectedExam.title} (Demo mode)`);
      setSelectedExam(null);
      setPassword('');
      setPasswordError('');
      // In real app: router.push(`/student/exam/${selectedExam.id}`);
    } else {
      setPasswordError('Mật khẩu không đúng. Vui lòng thử lại.');
    }
  };

  const handleClosePasswordModal = () => {
    setSelectedExam(null);
    setPassword('');
    setPasswordError('');
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-5 py-10">
        <h1 className="text-[#0065ca] text-3xl font-bold uppercase tracking-wide mb-4">Kỳ Thi</h1>
        <p className="text-[#5f6368] mb-6">
          Danh sách các kỳ thi đã tạo như Giữa kỳ, Cuối kỳ. Bạn có thể lọc theo học phần hoặc tìm kiếm.
        </p>

        <div className="bg-white border border-gray-200 shadow-sm p-3 flex gap-3 items-center mb-6 flex-wrap">
          <select 
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-[#0065ca] max-w-[260px]"
          >
            <option value="all">Tất cả học phần</option>
            <option value="kinhtevi">Kinh tế vi mô</option>
            <option value="kinhteluong">Kinh tế lượng</option>
            <option value="taichinhdn">Tài chính doanh nghiệp</option>
          </select>
          <input 
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Tìm theo tên kỳ thi..."
            className="flex-1 px-4 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-[#0065ca] max-w-[260px]"
          />
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5">
          {filteredExams.map((exam) => (
            <article key={exam.id} className="bg-white border border-gray-200 shadow-sm p-4.5 transition-all hover:-translate-y-1 hover:shadow-md hover:border-[#0065ca]">
              <div className="text-lg font-semibold text-[#202124] mb-1.5">{exam.title}</div>
              <div className="text-[#5f6368] text-sm mb-3">
                Ngày thi: {exam.date} • Hình thức: Vấn đáp AI • Thời lượng: {exam.duration}
              </div>
              <div className="flex justify-between items-center">
                <span className="bg-[#eef4ff] text-[#0065ca] px-2.5 py-1 text-xs font-semibold uppercase tracking-wide">
                  {exam.type}
                </span>
                <button 
                  onClick={() => handleEnterExam(exam)}
                  className="bg-[#0065ca] text-white px-3 py-2  hover:bg-[#004a95] transition-colors text-sm"
                >
                  Vào thi
                </button>
              </div>
            </article>
          ))}
        </section>

        {filteredExams.length === 0 && (
          <div className="text-center py-12 text-[#5f6368]">
            Không tìm thấy kỳ thi nào phù hợp với bộ lọc của bạn.
          </div>
        )}
      </main>

      <Footer />

      {/* Password Modal */}
      {selectedExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={handleClosePasswordModal} />
          <div className="relative bg-white  w-[92%] max-w-md p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-2">Nhập mật khẩu kỳ thi</h3>
            <p className="text-gray-700 mb-4">
              Kỳ thi: <span className="font-semibold">{selectedExam.title}</span>
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mật khẩu <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError('');
                }}
                placeholder="Nhập mật khẩu kỳ thi"
                className="w-full px-4 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-[#0065ca]"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handlePasswordSubmit();
                  }
                }}
              />
              {passwordError && (
                <p className="text-red-600 text-sm mt-1">{passwordError}</p>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <button 
                onClick={handleClosePasswordModal}
                className="px-4 py-2  border hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button 
                onClick={handlePasswordSubmit}
                className="px-4 py-2  bg-[#0065ca] text-white hover:bg-[#004a95] transition-colors"
              >
                Vào thi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

