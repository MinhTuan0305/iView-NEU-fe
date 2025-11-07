'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function TeacherLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: accept any credentials or use demo account
    if (email && password) {
      // Store login info in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', 'teacher');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', email.split('@')[0] || 'Giảng viên');
      router.push('/teacher/dashboard');
    }
  };

  const handleDemoLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', 'teacher');
    localStorage.setItem('userEmail', 'teacher@demo.neu.edu.vn');
    localStorage.setItem('userName', 'Giảng viên Demo');
    router.push('/teacher/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-5">
      <div className="bg-white p-12 shadow-lg w-full max-w-[420px] border border-black/8">
        <div className="text-center mb-6">
          <h2 className="text-[#0065ca] text-3xl font-semibold uppercase tracking-wide mb-2">Đăng Nhập Giảng Viên</h2>
          <p className="text-[#5f6368]">Chào mừng bạn quay trở lại với iView</p>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-medium text-[#202124]">Email</label>
            <div className="relative">
              <i className="fas fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-[#5f6368]"></i>
              <input 
                type="email" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email giảng viên của bạn" 
                required
                className="w-full px-10 py-3.5 border border-[#dfe3ea] transition-all focus:border-[#0065ca] focus:shadow-[0_0_0_2px_rgba(0,101,202,0.25)] focus:outline-none text-[15px]"
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-medium text-[#202124]">Mật khẩu</label>
            <div className="relative">
              <i className="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-[#5f6368]"></i>
              <input 
                type="password" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu" 
                required
                className="w-full px-10 py-3.5 border border-[#dfe3ea] transition-all focus:border-[#0065ca] focus:shadow-[0_0_0_2px_rgba(0,101,202,0.25)] focus:outline-none text-[15px]"
              />
            </div>
            <a href="#" className="self-end text-[#0065ca] text-sm font-medium hover:text-[#004a95] transition-colors mt-1">
              Quên mật khẩu?
            </a>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember" className="text-sm">Ghi nhớ đăng nhập</label>
          </div>

          <button 
            type="submit" 
            className="w-full py-4 bg-[#0065ca] text-white font-semibold uppercase tracking-wide transition-all hover:bg-[#004a95] text-base"
          >
            Đăng Nhập
          </button>

          <div className="flex items-center text-center text-[#5f6368] my-5">
            <div className="flex-1 border-b border-[#dfe3ea]"></div>
            <span className="px-2.5">hoặc</span>
            <div className="flex-1 border-b border-[#dfe3ea]"></div>
          </div>

          <button 
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-4 bg-[#FFE9A7] text-[#7C5A00] font-semibold uppercase tracking-wide transition-all hover:bg-[#FFE080] text-sm"
          >
            👨‍🏫 Đăng nhập Demo (Giảng viên)
          </button>

          <div className="text-center text-[#5f6368] mt-5">
            Chưa có tài khoản? <a href="#" className="text-[#0065ca] font-medium hover:underline">Đăng ký ngay</a>
          </div>
        </form>

        <div className="mt-6 text-center">
          <Link href="/select-role" className="text-[#0065ca] hover:underline text-sm">
            ← Chọn lại vai trò
          </Link>
        </div>
      </div>
    </div>
  );
}

