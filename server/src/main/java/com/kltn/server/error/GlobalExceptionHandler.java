package com.kltn.server.error;

import com.kltn.server.DTO.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {


    @ExceptionHandler(AppException.class)
    public ResponseEntity<ApiResponse<Void>> handleAppExceptions(AppException exception) {
        int statusCode = exception.getError() == null
                ? HttpStatus.BAD_REQUEST.value()
                : exception.getError().getCode();
//        StackTraceElement[] stackTrace = getStackTraces(exception);
        String error = exception.getError() == null
                ? exception.getMessage()
                : exception.getError().toString();
        ApiResponse<Void> response = ApiResponse.<Void>builder()
                .error(error)
                .message(exception.getError().getMessage())
                .code(statusCode)
//                .stackTrace(stackTrace)
                .build();

        return ResponseEntity.badRequest().body(response);
    }

}
