import { RoleType } from '@/types/auth.type'
import { IssueRelationShip } from '@/types/model/relationship'
import {
  IssuePriority,
  issuePriorityList,
  IssueTag,
  SkillLevel,
  SprintStatusType
} from '@/types/model/typeOf'

const messages = {
  validation: {
    uniId: 'Mã sinh viên cần 8 ký tự',
    inviteSelf: 'Bạn không thể mời chính mình',
    sprint: {
      form: {
        name: 'Tên sprint không được để trống',
        storyPoint: 'Số điểm sprint phải là số dương',
        startDate: 'Ngày bắt đầu phải trước ngày kết thúc',
        endDate: 'Ngày kết thúc phải sau ngày bắt đầu',
        predict: 'Thời gian dự đoán phải nằm trong khoảng thời gian của sprint',
        description: 'Mô tả sprint không được để trống'
      }
    }
  },
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
    course: {
      list: {
        empty: 'Không có dữ liệu về môn học của bạn'
      }
    },
    skill: {
      list: {
        empty: 'Không có dữ liệu về kỹ năng của bạn'
      }
    },
    workspace: {
      title: 'Khu vực môn học'
    }
  },
  component: {
    dashboard: {
      chart: {
        issueTrend: {
          title: 'Sự biến thiên số lượng issue',
          labelX: 'Giai đoạn',
          labelY: 'Số lượng issue',
          dataset: {
            labelIssueAdded: 'Issue được thêm',
            labelIssueRemoved: 'Issue bị loại bỏ'
          }
        },
        issueStatus: {
          title: 'Sự biến thiên trạng thái của các issue',
          labelX: 'Giai đoạn',
          labelY: 'Số lượng issue',
          dataset: {
            labelIssueTodo: 'Issue chuẩn bị thực hiện',
            labelIssueInProcess: 'Issue đang thực hiện',
            labelIssueReview: 'Issue đang đợi review'
          }
        },
        issuePriority: {
          title: 'Sự phân bố độ ưu tiên của các issue',
          labelX: 'Giai đoạn',
          labelY: 'Số lượng issue',
          scales: {
            y: 'Số lượng issue',
            x: 'Cấp độ'
          }
        },
        statusDoughnutChart: {
          title: 'Thống kê tình trạng issue',
          dataset: {
            labelIssueTodo: 'Issue chuẩn bị thực hiện',
            labelIssueInProcess: 'Issue đang thực hiện',
            labelIssueReview: 'Issue đang đợi review',
            labelIssueDone: 'Issue đã hoàn thành'
          }
        },
        workloadBarChart: {
          title: 'Tần suất làm việc',
          dataset: {
            labelIssueFailed: 'Issue chưa hoàn thành',
            labelIssueTotal: 'Tổng issue',
            labelIssueDone: 'Issue đã hoàn thành'
          },
          scales: {
            x: 'Số lượng issue',
            y: 'Thành viên'
          }
        }
      },
      teacher: {
        tasksByStatusPerStudentBarChart: {
          title: 'Phân loại trạng thái của các issue theo sinh viên',
          dataset: {
            labelIssueFailed: 'Issue chưa hoàn thành',
            labelIssueTotal: 'Tổng issue',
            labelIssueDone: 'Issue đã hoàn thành'
          },
          scales: {
            x: 'Số lượng issue',
            y: 'Thành viên'
          }
        },
        tasksByStatusPerProjectBarChart: {
          title: 'Phân loại trạng thái của các issue theo nhóm'
        }
      }
    },
    dataTable: {
      pagination: {
        previous: 'Trang trước',
        next: 'Trang tiếp theo',
        page: 'Trang',
        of: 'của',
        total: 'Tổng số',
        itemsPerPage: 'Mục mỗi trang',
        first: 'Trang đầu tiên',
        last: 'Trang cuối cùng'
      },
      user: {
        columns: {
          uniId: '#',
          name: 'Tên',
          className: 'Lớp',
          role: 'Vai trò'
        }
      },
      project: {
        columns: {
          id: '#',
          name: 'Tên nhóm',
          createAt: ' Ngày tạo',
          report: 'Báo cáo'
        }
      },
      sprint: {
        columns: {
          id: '#',
          title: 'Tên Sprint',
          point: 'Điểm',
          status: 'Trạng thái',
          start: 'Ngày bắt đầu',
          end: 'Ngày kết thúc',
          predict: 'Thời gian dự đoán',
          predictStatus: 'Trạng thái dự đoán',
          detail: 'Chi tiết'
        },
        actions: {
          report: 'Báo cáo'
        }
      }
    },
    dialog: {
      addStudent: {
        title: 'Thêm sinh viên',
        description: 'Sinh viên sẽ được mời tham gia khu vực môn học này',
        form: {
          uniId: {
            placeholder: 'Nhập mã sinh viên'
          },
          submit: 'Thêm sinh viên',
          cancel: 'Hủy'
        },
        toast: {
          notfound: {
            message: 'Sinh viên không tồn tại',
            description: 'Sinh viên với mã {{ids}} không tồn tại'
          },
          success: {
            message: 'Mời sinh viên thành công',
            description: 'Đã gửi lời mời đến sinh viên với mã {{ids}}'
          },
          conflict: {
            message: 'Sinh viên đã tham gia khu vực môn học này',
            description:
              'Sinh viên với mã {{ids}} đã tham gia khu vực môn học này'
          }
        }
      }
    },
    userDropdown: {
      account: 'Thông tin tài khoản',
      workspace: 'Khu vực môn học'
    },
    header: {
      login: 'Đăng nhập',
      register: 'Đăng ký'
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
          update: 'Cập nhật kỹ năng thành công'
        }
      }
    },
    viewWorkspace: {
      totalSprint: 'Tổng số Sprint',
      course: 'Môn học trước',
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
        name: 'Tên môn học',
        course: 'Môn học',
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
        name: 'Tên môn học',
        dateStart: 'Ngày bắt đầu',
        course: 'Môn học trong chương trình đào tạo',
        dateEnd: 'Ngày kết thúc',
        description: 'Mô tả',
        submit: 'Tạo'
      },
      toast: {
        success: {
          message: 'Tạo khu vực môn học thành công',
          description: `{{name}} - #{{id}}`
        },
        failed: 'Tạo khu vực môn học thất bại, vui lòng thử lại sau'
      }
    },
    workspaceCourseLayerCheck: {
      title: 'Cập nhập điểm môn học',
      description:
        'Môn học này cần yêu cầu bạn phải tham gia môn {{name}}} và các môn học tiên quyết khác. Vui lòng nhập điểm của các môn học này để tiếp tục.',
      form: {
        submit: 'Cập nhật điểm',
        cancel: 'Hủy'
      },
      toast: {
        success: 'Cập nhật điểm thành công',
        failed: 'Cập nhật điểm thất bại, vui lòng thử lại sau'
      }
    },
    dialogCreateWorkspace: {
      title: 'Tạo môn học',
      description: 'Khu vực môn học sẽ được tạo trong hệ thống của bạn'
    },
    project: {
      header: {
        dropdown: {
          invite: 'Mời sinh viên',
          members: 'Thông tin'
        }
      },
      dialog: {
        invite: {
          title: 'Tạo nhóm',
          description: 'Nhóm sẽ được tạo trong khu vực môn học này'
        },
        members: {
          title: 'Danh sách thành viên',
          description: 'Danh sách thành viên của nhóm này',
          table: {
            email: 'Email',
            uniId: 'Mã sinh viên',
            name: 'Tên'
          }
        }
      },
      form: {
        create: {
          name: 'Tên nhóm',
          description: 'Mô tả nhóm',
          submit: 'Tạo nhóm',
          toast: {
            success: {
              message: 'Tạo nhóm thành công',
              description: `Nhóm {{name}} - #{{id}}`
            },
            failed: 'Tạo nhóm thất bại, vui lòng thử lại sau'
          }
        }
      },
      invite: {
        title: 'Mời sinh viên vào nhóm',
        description: 'Sinh viên sẽ được mời tham gia nhóm này',
        form: {
          uniId: {
            placeholder: 'Nhập mã sinh viên'
          },
          submit: 'Mời sinh viên',
          cancel: 'Hủy'
        }
      }
    },
    sprint: {
      template: {
        dialog: {
          title: 'Mẫu Sprint',
          toast: {
            create: {
              success: {
                message: 'Tạo mẫu Sprint thành công',
                description: `{{title}} - #{{id}}`
              },
              conflict:
                'Đã có mẫu sprint được tạo trong khoảng thời gian này, vui lòng chọn thời gian khác',
              failed: 'Tạo mẫu Sprint thất bại, vui lòng thử lại sau'
            },
            update: {
              success: {
                message: 'Cập nhập Sprint thành công',
                description: `Sprint {{title}} - #{{id}}`
              },
              failed: 'Cập nhật Sprint thất bại, vui lòng thử lại sau'
            }
          }
        },
        baseForm: {
          name: 'Tên Sprint',
          storyPoint: {
            label: 'Story Point',
            placeholder: 'Nhập số điểm',
            description:
              'Số điểm của Sprint này, dùng để tính toán khối lượng công việc'
          },
          description: {
            label: 'Mô tả Sprint',
            placeholder: 'Nhập mô tả Sprint',
            description: 'Mô tả Sprint này, có thể để trống'
          },
          duration: 'Thời gian Sprint',
          startDate: 'Ngày bắt đầu',
          endDate: 'Ngày kết thúc',
          predict: 'Thời gian dự đoán',
          customDuration: 'Tùy chỉnh',
          week: 'tuần',
          submit: {
            create: 'Tạo mẫu Sprint',
            update: 'Cập nhật mẫu Sprint'
          }
        },
        card: {
          point: 'Điểm',
          dropdown: {
            edit: 'Chỉnh sửa',
            delete: 'Xóa'
          },
          alert: {
            title: 'Xóa mẫu Sprint',
            message: 'Bạn có chắc chắn muốn xóa mẫu Sprint "{{title}}" không?'
          },
          toast: {
            delete: {
              success: 'Xóa mẫu Sprint thành công',
              conflict: 'Sprint đã kết thúc, không thể xóa',
              failed: 'Xóa mẫu Sprint thất bại, vui lòng thử lại sau'
            }
          }
        }
      },
      listIssueInProductBacklog: {
        list: {
          empty: 'Chưa có issue nào trong Product Backlog'
        },
        create: 'Tạo issue'
      },
      listIssueInSprint: {
        list: {
          empty: 'Chưa có issue nào trong Sprint này'
        },
        create: 'Tạo issue'
      },
      sprintCardInBacklog: {
        dropdown: {
          moveToSprint: 'Chuyển sang sprint',
          edit: 'Chỉnh sửa issue',
          delete: 'Xóa issue'
        },
        alert: {
          delete: {
            title: 'Xóa issue',
            message: 'Bạn có chắc chắn muốn xóa issue "{{name}}" không?'
          }
        },
        toast: {
          moveToSprint: {
            success: {
              message: 'Chuyển issue vào sprint thành công',
              description: `Issue {{name}} đã được chuyển vào sprint`
            },
            failed: 'Chuyển issue vào sprint thất bại, vui lòng thử lại sau',
            conflict: 'Sprint này đang chạy, không thể thêm issue'
          }
        }
      },
      sprintCardInSprint: {
        dropdown: {
          moveToBacklog: 'Chuyển sang Product Backlog',
          edit: 'Chỉnh sửa issue',
          delete: 'Xóa issue',
          reopen: 'Mở lại issue'
        },
        alert: {
          moveToSprint: {
            title: 'Chuyển issue sang sprint',
            message:
              'Bạn có chắc chắn muốn chuyển issue "{{name}}" sang sprint này không?'
          },
          reopen: {
            title: 'Mở lại issue',
            message: 'Bạn có chắc chắn muốn mở lại issue "{{name}}" không?'
          }
        },
        toast: {
          moveToBacklog: {
            success: {
              message: 'Chuyển issue vào Product Backlog thành công',
              description: `Issue {{name}} đã được chuyển về Product Backlog`
            },
            failed:
              'Chuyển issue vào Product Backlog thất bại, vui lòng thử lại sau'
          },
          reopen: {
            success: 'Mở lại issue thành công',
            conflict: 'Issue không ở trạng thái DONE, không thể mở lại',
            failed: 'Mở lại issue thất bại, vui lòng thử lại sau'
          }
        },
        create: 'Tạo issue'
      },
      deleteDropdownItem: {
        dropdown: {
          delete: 'Xóa issue'
        },
        alert: {
          title: 'Xóa issue',
          message: 'Bạn có chắc chắn muốn xóa issue "{{name}}" không?'
        },
        toast: {
          success: 'Xóa issue thành công',
          failed: 'Xóa issue thất bại, vui lòng thử lại sau'
        }
      },
      updateDropdownItem: {
        dropdown: {
          edit: 'Chỉnh sửa issue'
        }
      }
    },
    issue: {
      topic: 'Chủ đề',
      description: 'Mô tả chi tiết',
      priority: 'Mức độ ưu tiên',
      select: {
        placeholder: 'Chọn sinh viên',
        null: 'Không chọn'
      },
      assignee: 'Người thực hiện',
      reviewer: 'Người đánh giá',
      subTasks: {
        label: 'Đầu công việc',
        placeholder: 'Nhập tên đầu công việc'
      },
      create: {
        title: 'Tạo issue',
        form: {
          name: 'Tên issue',
          tag: 'Loại issue',
          dateStart: 'Ngày bắt đầu',
          dateEnd: 'Ngày hết hạn',

          sprint: {
            label: 'Chọn sprint',
            placeholder: 'Chọn sprint để gán cho issue',
            null: 'Không chọn'
          },
          submit: 'Tạo issue'
        },
        toast: {
          success: {
            message: 'Tạo issue thành công',
            description: `Issue {{name}} - #{{id}}`
          },
          failed: 'Tạo issue thất bại, vui lòng thử lại sau'
        }
      },
      update: {
        form: {
          comment: 'Bình luận',
          detail: 'Mô tả chi tiết',
          priority: 'Mức độ ưu tiên',
          duration: 'Thời gian',
          descriptionFallback: 'Chưa có mô tả nào cho issue này',
          attachment: 'File đính kèm',
          subTask: {
            add: 'Thêm',
            cancel: 'Hủy'
          },
          relationship: {
            title: 'Quan hệ giữa các issue',
            fallback: 'Chưa có quan hệ nào được thiết lập',
            add: 'Thêm',
            cancel: 'Hủy',
            success: 'Thiết lập quan hệ thành công',
            failed: 'Thiết lập quan hệ thất bại, vui lòng thử lại sau',
            delete: {
              title: 'Xóa quan hệ',
              message: 'Bạn có chắc chắn muốn xóa quan hệ {{name}} không?',
              success: 'Xóa quan hệ thành công',
              failed: 'Xóa quan hệ thất bại, vui lòng thử lại sau'
            }
          }
        }
      }
    },
    notification: {
      title: 'Thông báo'
    },
    ui: {
      datePicker: {
        placeholder: 'Chọn ngày'
      }
    },
    reportSprintSheet: {
      title: 'Báo cáo Sprint',
      description: 'Báo cáo Sprint sẽ được gửi đến giáo viên của bạn',
      form: {
        daily1: {
          label: 'Daily 1',
          placeholder: 'Nhập nội dung Daily 1'
        },
        daily2: {
          label: 'Daily 2',
          placeholder: 'Nhập nội dung Daily 2'
        },
        backlog: {
          label: 'Backlog',
          placeholder: 'Tải lên file Backlog'
        }
      },
      status: {
        complete: 'Sprint đã hoàn thành, bạn không thể cập nhập các báo cáo',
        pending: 'Sprint chưa sẵn sàng, bạn không thể cập nhập các báo cáo'
      },
      close: 'Đóng',
      toast: {
        success: 'Gửi báo cáo thành công',
        failed: 'Gửi báo cáo thất bại, vui lòng thử lại sau'
      }
    },
    editorComment: {
      placeholder: 'Nhập bình luận của bạn tại đây',
      send: 'Gửi'
    },
    sprintPredict: {
      title: 'Dự đoán Sprint',
      description:
        'Dự đoán Sprint sẽ giúp bạn ước lượng thời gian hoàn thành các issue trong Sprint này',
      form: {
        submit: 'Dự đoán',
        cancel: 'Hủy'
      },
      toast: {
        success: 'Dự đoán Sprint có khả năng thành công',
        failed: 'Dự đoán Sprint thất bại, vui lòng thử lại sau'
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
          template: 'Mẫu Sprint',
          report: 'Báo cáo',
          dashboard: 'Thống kê'
        },
        template: {
          list: {
            empty: 'Chưa có mẫu Sprint nào được tạo trong khu vực môn học này'
          },
          create: 'Tạo mẫu Sprint'
        }
      }
    },
    project: {
      predict: 'Dự đoán',
      navigate: {
        backlog: 'Backlog',
        board: 'Bảng',
        report: 'Báo cáo',
        dashboard: 'Thống kê'
      },
      backlog: {
        list: {
          empty:
            'Chưa có danh sách các sprint, vui lòng đợi giáo viên tạo trước'
        }
      }
    }
  },
  other: {
    notHandle: 'Đã có lỗi xảy ra, vui lòng thử lại sau',
    notFound: 'Không tìm thấy trang yêu cầu',
    serverError: 'Đã có lỗi xảy ra, vui lòng thử lại sau',
    notData: 'Không có dữ liệu nào để hiển thị'
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

const getSprintStatusDisplayName = (status: SprintStatusType): string => {
  const map: Record<SprintStatusType, string> = {
    PENDING: 'Chưa bắt đầu',
    RUNNING: 'Đang diễn ra',
    COMPLETE: 'Đã hoàn thành'
  }
  return map[status] ?? 'Không xác định'
}

const getTagDisplayName = (tag: IssueTag): string => {
  const map: Record<IssueTag, string> = {
    THEORY: 'Lý thuyết',
    PRACTICE: 'Thực hành'
  }
  return map[tag] ?? 'Không xác định'
}

const getPriorityDisplayName = (priority: IssuePriority): string => {
  const map: Record<IssuePriority, string> = {
    BLOCKED: 'Đang bị chặn',
    TRIVIAL: 'Không đáng kể',
    MINOR: 'Nhỏ',
    MAJOR: 'Lớn ',
    CRITICAL: 'Nghiêm trọng '
  }
  return map[priority] ?? 'Không xác định'
}

const getRelationshipDisplayName = (type: IssueRelationShip): string => {
  const map: Record<IssueRelationShip, string> = {
    [IssueRelationShip.BLOCKS]: 'Chặn',
    [IssueRelationShip.IS_BLOCKED_BY]: 'Bị chặn bởi',
    [IssueRelationShip.RELATES_TO]: 'Liên quan đến',
    [IssueRelationShip.IS_RELATED_TO]: 'Được liên quan đến',
    [IssueRelationShip.DEPENDS_ON]: 'Phụ thuộc vào',
    [IssueRelationShip.IS_DEPENDED_ON_BY]: 'Được phụ thuộc vào',
    [IssueRelationShip.SUPERSEDES]: 'Thay thế',
    [IssueRelationShip.IS_SUPERSEDED_BY]: 'Bị thay thế bởi',
    [IssueRelationShip.DUPLICATES]: 'Trùng lặp',
    [IssueRelationShip.IS_DUPLICATED_BY]: 'Bị trùng lặp bởi'
  }
  return map[type] ?? 'Không xác định'
}

export default messages

export {
  getRoleDisplayName,
  getProficiencyDisplayName,
  getSprintStatusDisplayName,
  getTagDisplayName,
  getPriorityDisplayName,
  getRelationshipDisplayName
}
