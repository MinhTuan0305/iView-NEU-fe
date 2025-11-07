'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const userRole = localStorage.getItem('userRole');

      if (isLoggedIn && userRole) {
        // User is logged in, redirect to their home page
        if (userRole === 'student') {
          router.replace('/student/home');
        } else if (userRole === 'teacher') {
          router.replace('/teacher/dashboard');
        } else {
          router.replace('/select-role');
        }
      } else {
        // User is not logged in, redirect to role selection
        router.replace('/select-role');
      }
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#0065ca] border-t-transparent  animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Đang chuyển hướng...</p>
      </div>
    </div>
  );
}
