'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function TeacherDashboardPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-5 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-light text-[#0065ca] mb-3 tracking-tight">Dashboard Giảng Viên</h1>
          <p className="text-[#5f6368] text-lg font-light">Quản lý các buổi thi và luyện tập vấn đáp</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Upload Tài Liệu */}
          <Link 
            href="/teacher/upload-material" 
            className="bg-white border border-transparent p-10 transition-all hover:border-[#0065ca] hover:shadow-lg hover:-translate-y-1 shadow-sm"
          >
            <h3 className="text-xl font-semibold mb-4 text-[#0065ca]">Upload Tài Liệu</h3>
            <p className="text-[#5f6368] leading-relaxed text-sm font-light">
              Upload tài liệu chung (PDF) cho sinh viên sử dụng khi tạo buổi luyện tập
            </p>
          </Link>

          {/* Tạo Buổi Thi */}
          <Link 
            href="/teacher/create-exam" 
            className="bg-white border border-transparent p-10 transition-all hover:border-[#0065ca] hover:shadow-lg hover:-translate-y-1 shadow-sm"
          >
            <h3 className="text-xl font-semibold mb-4 text-[#0065ca]">Tạo Buổi Thi</h3>
            <p className="text-[#5f6368] leading-relaxed text-sm font-light">
              Tạo các buổi thi hoặc luyện tập vấn đáp chính thức cho học phần
            </p>
          </Link>

          {/* Review Bài Thi */}
          <Link 
            href="/teacher/review" 
            className="bg-white border border-transparent p-10 transition-all hover:border-[#0065ca] hover:shadow-lg hover:-translate-y-1 shadow-sm"
          >
            <h3 className="text-xl font-semibold mb-4 text-[#0065ca]">Review Bài Thi</h3>
            <p className="text-[#5f6368] leading-relaxed text-sm font-light">
              Xem và sửa điểm, đáp án, nhận xét của các bài thi sinh viên đã thực hiện
            </p>
          </Link>
        </div>

        {/* Recent Exams Section */}
        <section>
          <h2 className="text-3xl font-light text-[#0065ca] mb-8 tracking-wide">Các Buổi Thi Gần Đây</h2>
          <div className="bg-white border border-transparent shadow-sm">
            <div className="divide-y divide-gray-200">
              <div className="flex justify-between items-center p-6 hover:bg-gray-50 transition-colors">
                <div>
                  <h3 className="font-semibold text-[#202124] text-lg mb-1">Giữa kỳ - Kinh tế vi mô</h3>
                  <p className="text-sm text-[#5f6368] font-light">Ngày thi: 25/10/2025 • 15 sinh viên đã thi</p>
                </div>
                <Link 
                  href="/teacher/review?exam=1"
                  className="px-6 py-3 bg-[#0065ca] text-white font-semibold hover:bg-[#004a95] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  Xem chi tiết
                </Link>
              </div>
              <div className="flex justify-between items-center p-6 hover:bg-gray-50 transition-colors">
                <div>
                  <h3 className="font-semibold text-[#202124] text-lg mb-1">Cuối kỳ - Kinh tế lượng</h3>
                  <p className="text-sm text-[#5f6368] font-light">Ngày thi: 20/12/2025 • 8 sinh viên đã thi</p>
                </div>
                <Link 
                  href="/teacher/review?exam=2"
                  className="px-6 py-3 bg-[#0065ca] text-white font-semibold hover:bg-[#004a95] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  Xem chi tiết
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

