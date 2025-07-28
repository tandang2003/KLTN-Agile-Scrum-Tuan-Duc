package com.kltn.server.error;

import jakarta.servlet.http.HttpServletResponse;

public enum Error {
  // 4xx Client Errors
  BAD_REQUEST(HttpServletResponse.SC_BAD_REQUEST, "Yêu cầu không hợp lệ"),
  UNAUTHORIZED(HttpServletResponse.SC_UNAUTHORIZED, "Chưa xác thực người dùng"),
  FORBIDDEN(HttpServletResponse.SC_FORBIDDEN, "Không có quyền truy cập"),
  EXISTED_DATA(HttpServletResponse.SC_CONFLICT, "Dữ liệu đã tồn tại"),
  NOT_FOUND(HttpServletResponse.SC_NOT_FOUND, "Không tìm thấy tài nguyên"),
  METHOD_NOT_ALLOWED(HttpServletResponse.SC_METHOD_NOT_ALLOWED, "Phương thức HTTP không được phép"),
  CONFLICT(HttpServletResponse.SC_CONFLICT, "Xung đột với dữ liệu hiện tại"),
  PAYLOAD_TOO_LARGE(HttpServletResponse.SC_REQUEST_ENTITY_TOO_LARGE, "Kích thước yêu cầu quá lớn"),
  UNSUPPORTED_MEDIA_TYPE(HttpServletResponse.SC_UNSUPPORTED_MEDIA_TYPE, "Định dạng dữ liệu không được hỗ trợ"),
  TOO_MANY_REQUESTS(429, "Quá nhiều yêu cầu, vui lòng thử lại sau"),
  INVALID_PARAMETER_REQUEST(422, "Tham số yêu cầu không hợp lệ"),

  CREATE_FAILED(410, "Tạo mới tài nguyên thất bại"),
  INVITED_FAILED(411, "Mời người dùng thất bại"),

  ALREADY_EXISTS(HttpServletResponse.SC_CONFLICT, "Người dùng đã có trong dự án"),
  SPRINT_ALREADY_START(HttpServletResponse.SC_CONFLICT, "Sprint đã bắt đầu"),
  BACKLOG_FILE_ALREADY_UPLOAD(HttpServletResponse.SC_CONFLICT, "Tập tin backlog đã được tải lên"),
  SPRINT_ALREADY_END(HttpServletResponse.SC_CONFLICT, "Sprint đã kết thúc"),
  NOT_FOUND_WORKSPACE(404, "Không tìm thấy workspace"),
  SPRINT_CONFLICT_TIME(HttpServletResponse.SC_CONFLICT, "Thời gian sprint bị trùng với sprint khác"),
  NOT_FOUND_PROJECT(404, "Không tìm thấy dự án"),
  NOT_FOUND_COURSE(404, "Không tìm thấy môn học"),
  MISSING_PREREQUISITE(HttpServletResponse.SC_CONFLICT, "Vui lòng nhập điểm môn %s trước khi nhập điểm môn %s"),

  NOT_FOUND_USER_IN_WORKSPACE(404, "Không tìm thấy người dùng trong workspace"),
  NOT_FOUND_SPECIFYING_PROJECT_TEACHER(404, "Không tìm thấy dự án trong workspace bất kỳ"),

  NOT_FOUND_USER_PROJECT_RELATION(404, "Không tìm thấy mối quan hệ người dùng - dự án"),

  NOT_FOUND_SPRINT_PROJECT_RELATION(404, "Không tìm thấy mối quan hệ sprint - dự án"),

  // Authentication & Token Errors
  TOKEN_EXPIRED(440, "Token đã hết hạn"),
  TOKEN_INVALID(441, "Token không hợp lệ"),
  TOKEN_MISSING(442, "Thiếu token"),
  SESSION_EXPIRED(443, "Phiên đăng nhập đã hết hạn"),

  // 5xx Server Errors
  SERVER_ERROR(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Lỗi máy chủ"),
  DB_SERVER_ERROR(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Lỗi máy chủ cơ sở dữ liệu"),
  SERVER_SNAPSHOT_SERVICE_ERROR(HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
      "Lỗi máy chủ khi xử lý snapshot"),
  DB_SERVER_MISSING_DATA(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Máy chủ cơ sở dữ liệu thiếu dữ liệu"),
  INTERNAL_SERVER_ERROR(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Lỗi nội bộ máy chủ"),
  NOT_IMPLEMENTED(HttpServletResponse.SC_NOT_IMPLEMENTED, "Tính năng chưa được hỗ trợ"),
  BAD_GATEWAY(HttpServletResponse.SC_BAD_GATEWAY, "Gateway không hợp lệ"),
  SERVICE_UNAVAILABLE(HttpServletResponse.SC_SERVICE_UNAVAILABLE, "Dịch vụ tạm thời không khả dụng"),
  GATEWAY_TIMEOUT(HttpServletResponse.SC_GATEWAY_TIMEOUT, "Gateway phản hồi quá thời gian cho phép"),

  PRIVATE_KEY_READ_ERROR(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Lỗi đọc tập tin khóa riêng"),
  PRIVATE_KEY_GENERATION_ERROR(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Lỗi tạo khóa riêng"),
  PUBLIC_KEY_READ_ERROR(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Lỗi đọc tập tin khóa công khai"),
  PUBLIC_KEY_GENERATION_ERROR(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Lỗi tạo khóa công khai"),

  SKILL_NOT_FOUND(404, "Không tìm thấy kỹ năng"),
  PERSONAL_SKILL_NOT_FOUND(404, "Không tìm thấy kỹ năng cá nhân"),
  DAILY_FILE_ALREADY_UPLOAD(HttpServletResponse.SC_CONFLICT, "Tập tin daily đã được tải lên"),
  COMMENT_ASSIGNEE_STATUS_ISSUE(HttpServletResponse.SC_CONFLICT, "Người được giao nhiệm vụ chưa comment"),
  COMMENT_REVIEWER_STATUS_ISSUE(HttpServletResponse.SC_CONFLICT, "Người được giao review chưa comment");

  private int code;
  private String message;

  Error(int code, String message) {
    this.code = code;
    this.message = message;
  }

  public int getCode() {
    return code;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }
}
