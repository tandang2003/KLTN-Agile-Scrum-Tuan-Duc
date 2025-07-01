import { RoleType } from '@/types/auth.type'
import { SkillLevel } from '@/types/model/typeOf'

const messages = {
  validation: {},
  auth: {
    login: {
      success: 'Đăng nhập thành công',
      fail: 'Đăng nhập thất bại, vui lòng kiểm tra lại thông tin đăng nhập'
    },
    logout: 'Đăng xuất thành công',
    register: {
      success: 'Đăng ký thành công',
      fail: 'Đăng ký thất bại, vui lòng thử lại sau',
      idExist: 'Tài khoản với mã sinh viên đã tồn tại'
    }
  },
  user: {
    navigate: {
      skill: 'Kỹ năng',
      course: 'Môn học'
    },
    info: {
      title: 'Thông tin tài khoản',
      uniId: 'Mã sinh viên',
      name: 'Họ và tên',
      role: 'Vai trò',
      email: 'Email',
      phone: 'Số điện thoại'
    },
    course: {},
    skill: {},
    workspace: {
      title: 'Khu vực môn học'
    }
  },
  component: {
    userDropdown: {
      account: 'Thông tin tài khoản',
      workspace: 'Khu vực môn học'
    },
    logoutButton: {
      title: 'Đăng xuất',
      toast: 'Đăng xuất thành công'
    },
    skill: {
      dialog: {
        title: 'Kỹ năng'
      },
      form: {
        skill: {
          label: 'Tên kỹ năng',
          popover: 'Chọn kỹ năng'
        },
        proficiency: {
          label: 'Trình độ'
        },
        button: {
          add: 'Thêm kỹ năng',
          update: 'Cập nhật kỹ năng'
        }
      },
      item: {
        delete: 'Xóa kỹ năng',
        update: 'Cập nhật kỹ năng',
        alert: {
          title: 'Xóa kỹ năng',
          message: 'Bạn có chắc chắn muốn xóa kỹ năng {{name}} không?'
        },
        toast: {
          delete: {
            success: 'Xóa kỹ năng thành công',
            failed: 'Đã có lỗi xảy ra, vui lòng thử lại sau'
          },
          update: 'Cập nhật kỹ năng thành công',
          error: 'Đã có lỗi xảy ra, vui lòng thử lại sau'
        }
      }
    },
    viewWorkspace: {
      totalSprint: 'Tổng số Sprint',
      start: 'Ngày bắt đầu môn học',
      end: 'Ngày kết thúc môn học',
      description: {
        title: 'Mô tả môn học',
        fallback: 'Không có mô tả nào cho môn học này'
      },
      timeline: {
        title: 'Lịch trình các sprint'
      }
    },
    updateWorkspace: {
      form: {
        name: 'Tên không gian',
        dateStart: 'Ngày bắt đầu',
        dateEnd: 'Ngày kết thúc',
        description: 'Mô tả',
        submit: 'Cập nhật'
      },
      toast: {
        success: {
          message: 'Cập nhật khu vực môn học thành công',
          description: `{{name}} - #{{id}}`
        },
        failed: 'Cập nhật khu vực môn học thất bại, vui lòng thử lại sau'
      }
    },
    createWorkspace: {
      form: {
        name: 'Tên không gian',
        dateStart: 'Ngày bắt đầu',
        dateEnd: 'Ngày kết thúc',
        description: 'Mô tả',
        submit: 'Tạo không gian'
      },
      toast: {
        success: {
          message: 'Tạo khu vực môn học thành công',
          description: `{{name}} - #{{id}}`
        },
        failed: 'Tạo khu vực môn học thất bại, vui lòng thử lại sau'
      }
    }
  },
  manager: {
    workspace: {
      title: 'Khu vực môn học',
      list: {
        empty: 'Bạn chưa tham gia môn học nào'
      },
      items: {},

      detail: {
        title: 'Chi tiết khu vực môn học',
        notFound: 'Không tìm thấy khu vực môn học',
        options: {
          teacher: {
            label: 'Cài đặt',
            addStudent: 'Thêm sinh viên'
          },
          empty: 'Không có tùy chọn nào'
        },

        student: {
          title: 'Danh sách sinh viên',
          empty: 'Chưa có sinh viên nào tham gia khu vực này'
        },
        project: {
          title: 'Danh sách nhóm',
          empty: 'Chưa có nhóm nào được tạo trong khu vực này',
          me: 'Nhóm',
          create: 'Tạo nhóm'
        },
        navigate: {
          summary: 'Tổng quan',
          student: 'Sinh viên',
          project: 'Nhóm',
          template: 'Mẫu Sprint'
        }
      }
    }
  },
  other: {
    notHandle: 'Đã có lỗi xảy ra, vui lòng thử lại sau',
    notFound: 'Không tìm thấy trang yêu cầu',
    serverError: 'Đã có lỗi xảy ra, vui lòng thử lại sau'
  }
}

const getRoleDisplayName = (role: RoleType): string => {
  const map: Record<RoleType, string> = {
    teacher: 'Giáo viên',
    student: 'Sinh viên',
    anonymous: 'Ẩn danh'
  }
  return map[role] ?? 'Không xác định'
}

const getProficiencyDisplayName = (proficiency: number): string => {
  const map: Record<SkillLevel, string> = {
    [SkillLevel.Beginner]: 'Cơ bản',
    [SkillLevel.Intermediate]: 'Trung cấp',
    [SkillLevel.Proficient]: 'Thành thạo',
    [SkillLevel.Advanced]: 'Nâng cao',
    [SkillLevel.Expert]: 'Chuyên gia'
  }
  return map[proficiency as SkillLevel] ?? 'Không xác định'
}

export default messages

export { getRoleDisplayName, getProficiencyDisplayName }
