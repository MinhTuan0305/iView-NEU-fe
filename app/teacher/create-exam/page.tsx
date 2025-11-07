'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomSelect from '@/components/CustomSelect';

export default function CreateExamPage() {
  const router = useRouter();
  const [examName, setExamName] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [materialSource, setMaterialSource] = useState<'uploaded' | 'neureader' | 'new'>('uploaded');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [newMaterialFile, setNewMaterialFile] = useState<File | null>(null);
  const [timeLimit, setTimeLimit] = useState('');
  const [bloomLevel, setBloomLevel] = useState<string[]>([]);
  const [password, setPassword] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [language, setLanguage] = useState<'vietnamese' | 'english'>('vietnamese');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Demo data
  const uploadedMaterials = [
    { id: '1', name: 'Giáo trình Kinh tế vi mô - GS. Nguyễn Văn A' },
    { id: '2', name: 'Slide bài giảng Kinh tế lượng - TS. Trần Thị B' },
    { id: '3', name: 'Tài liệu ôn tập Tài chính doanh nghiệp' }
  ];

  const bloomLevels = [
    { value: 'remember', label: 'Remember (Nhớ lại)' },
    { value: 'understand', label: 'Understand (Hiểu)' },
    { value: 'apply', label: 'Apply (Áp dụng)' },
    { value: 'analyze', label: 'Analyze (Phân tích)' },
    { value: 'evaluate', label: 'Evaluate (Đánh giá)' },
    { value: 'create', label: 'Create (Sáng tạo)' }
  ];

  const handleBloomChange = (level: string) => {
    setBloomLevel(prev => {
      const index = prev.indexOf(level);
      if (index > -1) {
        // Remove level and all higher levels
        const levelIndex = bloomLevels.findIndex(l => l.value === level);
        return prev.filter(l => {
          const lIndex = bloomLevels.findIndex(bl => bl.value === l);
          return lIndex < levelIndex;
        });
      } else {
        // Add level and all lower levels
        const levelIndex = bloomLevels.findIndex(l => l.value === level);
        const levelsToAdd = bloomLevels.slice(0, levelIndex + 1).map(l => l.value);
        const newLevels = [...new Set([...prev, ...levelsToAdd])];
        return newLevels.sort((a, b) => {
          const aIndex = bloomLevels.findIndex(l => l.value === a);
          const bIndex = bloomLevels.findIndex(l => l.value === b);
          return aIndex - bIndex;
        });
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!examName || !subjectName || !timeLimit || bloomLevel.length === 0 || !password || !startTime || !endTime) {
      setError('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    if (materialSource === 'uploaded' && !selectedMaterial) {
      setError('Vui lòng chọn tài liệu');
      return;
    }

    if (materialSource === 'new' && !newMaterialFile) {
      setError('Vui lòng upload tài liệu mới');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Demo-only: simulate creation
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Đã tạo buổi thi thành công! (Demo mode)');
      router.push('/teacher/dashboard');
    } catch (err) {
      setError('Có lỗi xảy ra khi tạo buổi thi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-5 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-[#0065ca] mb-2">Tạo Buổi Thi / Luyện Tập</h1>
          <p className="text-[#5f6368]">Tạo buổi thi hoặc luyện tập vấn đáp chính thức cho học phần</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white  shadow-sm p-8 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 ">
              {error}
            </div>
          )}

          {/* Tên buổi vấn đáp */}
          <div>
            <label className="block text-sm font-semibold text-[#202124] mb-3">
              Tên buổi vấn đáp <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
              placeholder="Ví dụ: Giữa kỳ - Kinh tế vi mô"
              required
              className="w-full px-4 py-2.5 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-[#0065ca]"
            />
          </div>

          {/* Tên học phần */}
          <div>
            <label className="block text-sm font-semibold text-[#202124] mb-3">
              Tên học phần <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              placeholder="Ví dụ: Kinh tế vi mô"
              required
              className="w-full px-4 py-2.5 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-[#0065ca]"
            />
          </div>

          {/* Lựa chọn tài liệu */}
          <div>
            <label className="block text-sm font-semibold text-[#202124] mb-3">
              Lựa chọn tài liệu <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="materialSource"
                    value="uploaded"
                    checked={materialSource === 'uploaded'}
                    onChange={(e) => setMaterialSource(e.target.value as 'uploaded')}
                    className="mr-2"
                  />
                  <span className="text-sm">Tài liệu đã Upload</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="materialSource"
                    value="neureader"
                    checked={materialSource === 'neureader'}
                    onChange={(e) => setMaterialSource(e.target.value as 'neureader')}
                    className="mr-2"
                  />
                  <span className="text-sm">NeuReader</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="materialSource"
                    value="new"
                    checked={materialSource === 'new'}
                    onChange={(e) => setMaterialSource(e.target.value as 'new')}
                    className="mr-2"
                  />
                  <span className="text-sm">Upload thêm tài liệu</span>
                </label>
              </div>

              {materialSource === 'uploaded' && (
                <CustomSelect
                  value={selectedMaterial}
                  onChange={setSelectedMaterial}
                  options={uploadedMaterials.map(material => ({ value: material.id, label: material.name }))}
                  placeholder="-- Chọn tài liệu --"
                  required
                />
              )}

              {materialSource === 'neureader' && (
                <div className="p-4 bg-blue-50 border border-blue-200 ">
                  <p className="text-sm text-blue-800">Tính năng tích hợp với NeuReader sẽ được kích hoạt khi có API.</p>
                </div>
              )}

              {materialSource === 'new' && (
                <div>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setNewMaterialFile(e.target.files?.[0] || null)}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-[#0065ca]"
                  />
                  <p className="text-xs text-[#5f6368] mt-1">Chỉ chấp nhận file PDF</p>
                </div>
              )}
            </div>
          </div>

          {/* Thời gian thi/luyện tập */}
          <div>
            <label className="block text-sm font-semibold text-[#202124] mb-3">
              Thời gian thi / luyện tập (phút) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={timeLimit}
              onChange={(e) => setTimeLimit(e.target.value)}
              placeholder="Ví dụ: 30"
              min="1"
              required
              className="w-full px-4 py-2.5 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-[#0065ca]"
            />
          </div>

          {/* Chọn độ khó Bloom */}
          <div>
            <label className="block text-sm font-semibold text-[#202124] mb-3">
              Chọn độ khó theo thang đo Bloom <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-[#5f6368] mb-3">Khi chọn độ khó cao hơn, hệ thống sẽ tự động bao gồm cả độ khó thấp hơn</p>
            <div className="space-y-2">
              {bloomLevels.map((level) => (
                <label key={level.value} className="flex items-center p-3 border border-gray-200  hover:border-[#0065ca] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bloomLevel.includes(level.value)}
                    onChange={() => handleBloomChange(level.value)}
                    className="mr-3 w-4 h-4"
                  />
                  <span className="text-sm">{level.label}</span>
                </label>
              ))}
            </div>
            {bloomLevel.length > 0 && (
              <p className="text-xs text-[#5f6368] mt-2">
                Đã chọn: {bloomLevel.map(l => bloomLevels.find(bl => bl.value === l)?.label).join(', ')}
              </p>
            )}
          </div>

          {/* Mật khẩu */}
          <div>
            <label className="block text-sm font-semibold text-[#202124] mb-3">
              Tạo mật khẩu cho lớp học phần <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ví dụ: KTVI2025"
              required
              className="w-full px-4 py-2.5 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-[#0065ca]"
            />
            <p className="text-xs text-[#5f6368] mt-1">Mật khẩu này sẽ được yêu cầu khi sinh viên vào thi</p>
          </div>

          {/* Chọn ngôn ngữ */}
          <div>
            <label className="block text-sm font-semibold text-[#202124] mb-3">
              Chọn ngôn ngữ <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              <label className="flex items-center p-3 border border-gray-200  hover:border-[#0065ca] cursor-pointer">
                <input
                  type="radio"
                  name="language"
                  value="vietnamese"
                  checked={language === 'vietnamese'}
                  onChange={(e) => setLanguage(e.target.value as 'vietnamese')}
                  className="mr-3"
                />
                <span className="text-sm">Tiếng Việt</span>
              </label>
              <label className="flex items-center p-3 border border-gray-200  hover:border-[#0065ca] cursor-pointer">
                <input
                  type="radio"
                  name="language"
                  value="english"
                  checked={language === 'english'}
                  onChange={(e) => setLanguage(e.target.value as 'english')}
                  className="mr-3"
                />
                <span className="text-sm">English</span>
              </label>
            </div>
            <p className="text-xs text-[#5f6368] mt-2">Ngôn ngữ sẽ được sử dụng cho câu hỏi và giao diện phỏng vấn</p>
          </div>

          {/* Thời gian mở và kết thúc */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#202124] mb-3">
                Thời gian mở buổi vấn đáp <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-[#0065ca]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#202124] mb-3">
                Thời gian kết thúc buổi vấn đáp <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-[#0065ca]"
              />
            </div>
          </div>

          {/* Buttons */}
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
              {loading ? 'Đang tạo...' : 'Tạo Buổi Thi'}
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}

