'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function UploadMaterialPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [materialName, setMaterialName] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Load materials from localStorage hoặc API
  const loadMaterials = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('uploadedMaterials');
      if (stored) {
        return JSON.parse(stored);
      }
    }
    // Default demo data
    return [
      { id: '1', name: 'Giáo trình Kinh tế vi mô - GS. Nguyễn Văn A', uploadDate: '2025-11-01', isPublic: true },
      { id: '2', name: 'Slide bài giảng Kinh tế lượng - TS. Trần Thị B', uploadDate: '2025-11-05', isPublic: true },
      { id: '3', name: 'Tài liệu ôn tập Tài chính doanh nghiệp', uploadDate: '2025-11-10', isPublic: false }
    ];
  };

  const [uploadedMaterials, setUploadedMaterials] = useState(loadMaterials());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file || !materialName) {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Demo-only: simulate upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add to list
      const newMaterial = {
        id: String(uploadedMaterials.length + 1),
        name: materialName,
        uploadDate: new Date().toISOString().split('T')[0],
        isPublic: visibility === 'public'
      };
      setUploadedMaterials([...uploadedMaterials, newMaterial]);
      
      // Lưu vào localStorage để các trang khác có thể sử dụng
      if (typeof window !== 'undefined') {
        localStorage.setItem('uploadedMaterials', JSON.stringify([...uploadedMaterials, newMaterial]));
      }
      
      setSuccess(true);
      setFile(null);
      setMaterialName('');
      setDescription('');
      setVisibility('public');
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Có lỗi xảy ra khi upload tài liệu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-5 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-[#0065ca] mb-2">Upload Tài Liệu Chung</h1>
          <p className="text-[#5f6368]">Upload tài liệu PDF để sinh viên sử dụng khi tạo buổi luyện tập</p>
        </div>

        <div className="bg-white  shadow-sm p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#202124] mb-6">Upload Tài Liệu Mới</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 ">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 ">
                Upload tài liệu thành công!
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-[#202124] mb-3">
                Tên tài liệu <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={materialName}
                onChange={(e) => setMaterialName(e.target.value)}
                placeholder="Ví dụ: Giáo trình Kinh tế vi mô - GS. Nguyễn Văn A"
                required
                className="w-full px-4 py-2.5 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-[#0065ca]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#202124] mb-3">
                Mô tả (Tùy chọn)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mô tả về tài liệu..."
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-[#0065ca]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#202124] mb-3">
                File PDF <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                required
                className="w-full px-4 py-2.5 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-[#0065ca]"
              />
              <p className="text-xs text-[#5f6368] mt-1">Chỉ chấp nhận file PDF</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#202124] mb-3">
                Quyền truy cập <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                <label className="flex items-center p-3 border border-gray-200  hover:border-[#0065ca] cursor-pointer flex-1">
                  <input
                    type="radio"
                    name="visibility"
                    value="public"
                    checked={visibility === 'public'}
                    onChange={(e) => setVisibility(e.target.value as 'public')}
                    className="mr-3"
                  />
                  <div>
                    <span className="text-sm font-medium block">Public</span>
                    <span className="text-xs text-[#5f6368]">Sinh viên và tất cả người dùng đều thấy</span>
                  </div>
                </label>
                <label className="flex items-center p-3 border border-gray-200  hover:border-[#0065ca] cursor-pointer flex-1">
                  <input
                    type="radio"
                    name="visibility"
                    value="private"
                    checked={visibility === 'private'}
                    onChange={(e) => setVisibility(e.target.value as 'private')}
                    className="mr-3"
                  />
                  <div>
                    <span className="text-sm font-medium block">Private</span>
                    <span className="text-xs text-[#5f6368]">Chỉ giảng viên mới thấy</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2.5 border border-gray-300  hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-2.5 bg-[#0065ca] text-white font-semibold  hover:bg-[#004a95] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Đang upload...' : 'Upload Tài Liệu'}
              </button>
            </div>
          </form>
        </div>

        {/* List of uploaded materials */}
        <div className="bg-white  shadow-sm p-8">
          <h2 className="text-xl font-semibold text-[#202124] mb-6">Tài Liệu Đã Upload</h2>
          
          {uploadedMaterials.length === 0 ? (
            <p className="text-[#5f6368] text-center py-8">Chưa có tài liệu nào được upload</p>
          ) : (
            <div className="space-y-3">
              {uploadedMaterials.map((material) => (
                <div
                  key={material.id}
                  className="flex justify-between items-center p-4 border border-gray-200  hover:border-[#0065ca] transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-[#202124]">{material.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium ${
                        material.isPublic 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {material.isPublic ? 'Public' : 'Private'}
                      </span>
                    </div>
                    <p className="text-sm text-[#5f6368]">Upload ngày: {material.uploadDate}</p>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm('Bạn có chắc muốn xóa tài liệu này?')) {
                        const updated = uploadedMaterials.filter(m => m.id !== material.id);
                        setUploadedMaterials(updated);
                        // Cập nhật localStorage
                        if (typeof window !== 'undefined') {
                          localStorage.setItem('uploadedMaterials', JSON.stringify(updated));
                        }
                      }
                    }}
                    className="px-4 py-2 text-red-600 border border-red-300  hover:bg-red-50 transition-colors text-sm"
                  >
                    Xóa
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

