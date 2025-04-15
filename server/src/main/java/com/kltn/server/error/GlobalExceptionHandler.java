package com.kltn.server.error;

import com.kltn.server.DTO.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.kltn.server.error.Error.INVALID_PARAMETER_REQUEST;

@RestControllerAdvice
public class GlobalExceptionHandler {

        @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<ApiResponse<Void>> handleValidationExceptions(MethodArgumentNotValidException exception) {
                List<FieldError> fieldErrors = exception.getBindingResult().getFieldErrors();
                List<Map<String, String>> errors = fieldErrors.stream()
                                .map(fieldError -> {
                                        Map<String, String> error = new HashMap<>();
                                        error.put("field", fieldError.getField());
                                        error.put("message", fieldError.getDefaultMessage());
                                        return error;
                                })
                                .collect(Collectors.toList());
                ApiResponse<Void> response = ApiResponse.<Void>builder()
                                .error(errors)
                                .message(INVALID_PARAMETER_REQUEST.getMessage())
                                .code(INVALID_PARAMETER_REQUEST.getCode())
                                .build();
                return ResponseEntity.status(INVALID_PARAMETER_REQUEST.getCode()).body(response);
        }

        @ExceptionHandler(AppException.class)
        public ResponseEntity<ApiResponse<Void>> handleAppExceptions(AppException exception) {
                int statusCode = exception.getError() == null
                                ? HttpStatus.BAD_REQUEST.value()
                                : exception.getError().getCode();
                String error = exception.getError() == null
                                ? exception.getMessage()
                                : exception.getError().toString();
                ApiResponse<Void> response = ApiResponse.<Void>builder()
                                .error(error)
                                .message(exception.getError().getMessage())
                                .code(statusCode)
                                .build();
                return ResponseEntity.status(statusCode).body(response);
        }
}
