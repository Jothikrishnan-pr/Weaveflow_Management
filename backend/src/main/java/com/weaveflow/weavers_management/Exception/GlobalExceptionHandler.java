package com.weaveflow.weavers_management.Exception;

import com.weaveflow.weavers_management.dto.ErrorResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler
{
    @ExceptionHandler(RuntimeException.class)

    public ResponseEntity<ErrorResponseDTO> handleRuntimeException(RuntimeException exception)
    {
        ErrorResponseDTO error=new ErrorResponseDTO(HttpStatus.BAD_REQUEST.value(),exception.getMessage());
        return new ResponseEntity<>(error,HttpStatus.BAD_REQUEST);
    }
}
