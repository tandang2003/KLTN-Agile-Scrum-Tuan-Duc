const RULES: Record<number, Array<string>> = {
  3: [
    // High Complexity
    // Vietnamese
    'tối ưu hiệu năng',
    'refactor',
    'kiến trúc',
    'thiết kế lại',
    'phức tạp',
    'hệ thống lớn',
    'nhiều phần',
    'đa bước',
    // English
    'performance optimization',
    'refactor core',
    'system design',
    'architecture',
    'complex',
    'multi-step',
    'deep integration'
  ],
  2: [
    // Medium Complexity
    // Vietnamese
    'tạo api',
    'thêm api',
    'tạo component',
    'viết test',
    'kết nối cơ sở dữ liệu',
    'xử lý logic',
    'xác thực',
    'upload file',
    // English
    'create api',
    'add endpoint',
    'build component',
    'write tests',
    'connect database',
    'handle logic',
    'validation',
    'upload file'
  ],
  1: [
    // Low Complexity
    // Vietnamese
    'sửa lỗi chính tả',
    'cập nhật giao diện',
    'đổi màu',
    'đổi tên',
    'thêm icon',
    'chỉnh sửa nhỏ',
    'cập nhật nội dung',
    // English
    'fix typo',
    'update ui',
    'change color',
    'rename',
    'add icon',
    'minor update',
    'content edit'
  ]
}

function getComplexityBilingual(description: string): number {
  const text = description.toLowerCase()

  // Priority: Match from High to Low complexity
  for (const level of [3, 2, 1]) {
    const keywords = RULES[level]
    if (keywords.some((kw) => text.includes(kw))) {
      return level
    }
  }

  // Fallback: Use text length as hint
  if (text.length < 50) return 1
  if (text.length < 150) return 2

  return 3 // Default to high if long and unknown
}

export { getComplexityBilingual }
