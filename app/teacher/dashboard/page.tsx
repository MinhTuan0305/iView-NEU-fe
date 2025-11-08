'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function TeacherDashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fbff] via-white to-[#eef4ff]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#001a33] via-[#003366] to-[#004a95] text-white py-20 px-5 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMCAwVjIyaDJ2MTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-8">
            <h1 className="text-5xl font-semibold mb-4 tracking-tight">Dashboard Giảng Viên</h1>
            <p className="text-xl text-blue-100 font-light max-w-2xl">
              Quản lý các buổi thi và luyện tập vấn đáp một cách hiệu quả
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-lg">
              <div className="text-3xl font-bold mb-1">12</div>
              <div className="text-blue-200 text-sm">Buổi thi đã tạo</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-lg">
              <div className="text-3xl font-bold mb-1">156</div>
              <div className="text-blue-200 text-sm">Sinh viên đã thi</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-lg">
              <div className="text-3xl font-bold mb-1">8</div>
              <div className="text-blue-200 text-sm">Tài liệu đã upload</div>
            </div>
          </div>
        </div>
      </section>
      
      <main className="max-w-7xl mx-auto px-5 py-16 -mt-8 relative z-20">
        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Upload Tài Liệu */}
          <Link 
            href="/teacher/upload-material" 
            className="group relative bg-white border border-gray-200 p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-[#0065ca] rounded-lg overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-[#0065ca] to-[#004a95] rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#202124] group-hover:text-[#0065ca] transition-colors">Upload Tài Liệu</h3>
              <p className="text-[#5f6368] leading-relaxed text-sm">
                Upload tài liệu chung (PDF) cho sinh viên sử dụng khi tạo buổi luyện tập
              </p>
              <div className="mt-4 text-[#0065ca] text-sm font-medium flex items-center group-hover:translate-x-1 transition-transform duration-300">
                Bắt đầu <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>
          </Link>

          {/* Tạo Buổi Thi */}
          <Link 
            href="/teacher/create-exam" 
            className="group relative bg-white border border-gray-200 p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-[#0065ca] rounded-lg overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-[#0065ca] to-[#004a95] rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#202124] group-hover:text-[#0065ca] transition-colors">Tạo Buổi Thi</h3>
              <p className="text-[#5f6368] leading-relaxed text-sm">
                Tạo các buổi thi hoặc luyện tập vấn đáp chính thức cho học phần
              </p>
              <div className="mt-4 text-[#0065ca] text-sm font-medium flex items-center group-hover:translate-x-1 transition-transform duration-300">
                Bắt đầu <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>
          </Link>

          {/* Review Bài Thi */}
          <Link 
            href="/teacher/review" 
            className="group relative bg-white border border-gray-200 p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-[#0065ca] rounded-lg overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-[#0065ca] to-[#004a95] rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#202124] group-hover:text-[#0065ca] transition-colors">Review Bài Thi</h3>
              <p className="text-[#5f6368] leading-relaxed text-sm">
                Xem và sửa điểm, đáp án, nhận xét của các bài thi sinh viên đã thực hiện
              </p>
              <div className="mt-4 text-[#0065ca] text-sm font-medium flex items-center group-hover:translate-x-1 transition-transform duration-300">
                Bắt đầu <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Exams Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-semibold text-[#202124] mb-2">Các Buổi Thi Gần Đây</h2>
              <p className="text-[#5f6368]">Xem và quản lý các buổi thi đã tạo</p>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
            <div className="divide-y divide-gray-100">
              <div className="group flex justify-between items-center p-6 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent transition-all duration-300">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#0065ca] to-[#004a95] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#202124] text-lg mb-1 group-hover:text-[#0065ca] transition-colors">Giữa kỳ - Kinh tế vi mô</h3>
                    <div className="flex items-center gap-4 text-sm text-[#5f6368]">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        25/10/2025
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        15 sinh viên
                      </span>
                    </div>
                  </div>
                </div>
                <Link 
                  href="/teacher/review?exam=1"
                  className="px-6 py-3 bg-gradient-to-r from-[#0065ca] to-[#004a95] text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  Xem chi tiết
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              
              <div className="group flex justify-between items-center p-6 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent transition-all duration-300">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#0065ca] to-[#004a95] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#202124] text-lg mb-1 group-hover:text-[#0065ca] transition-colors">Cuối kỳ - Kinh tế lượng</h3>
                    <div className="flex items-center gap-4 text-sm text-[#5f6368]">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        20/12/2025
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        8 sinh viên
                      </span>
                    </div>
                  </div>
                </div>
                <Link 
                  href="/teacher/review?exam=2"
                  className="px-6 py-3 bg-gradient-to-r from-[#0065ca] to-[#004a95] text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  Xem chi tiết
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
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

