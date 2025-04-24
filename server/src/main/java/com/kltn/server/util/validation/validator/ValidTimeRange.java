package com.kltn.server.util.validation.validator;

import com.kltn.server.DTO.request.workspace.WorkspaceCreationRequest;
import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.util.constant.DateConstraint;
import com.kltn.server.util.validation.ValidTimeRangeValidator;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.lang.reflect.Field;
import java.time.Instant;

public class ValidTimeRange implements ConstraintValidator<ValidTimeRangeValidator, Object> {
    private String mainField;
    private String dependencyField;
    private DateConstraint constraint;

    @Override
    public void initialize(ValidTimeRangeValidator constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
        this.mainField = constraintAnnotation.mainField();
        this.dependencyField = constraintAnnotation.dependencyField();
        this.constraint = constraintAnnotation.constraint();
    }

    @Override
    public boolean isValid(Object obj, ConstraintValidatorContext context) {
        try {
            Field mainField = obj.getClass().getDeclaredField(this.mainField);
            mainField.setAccessible(true);
            Field dependencyField = obj.getClass().getDeclaredField(this.dependencyField);
            dependencyField.setAccessible(true);
            Instant mainTime = (Instant) mainField.get(obj);
            Instant dependencyTime = (Instant) dependencyField.get(obj);
            boolean flag = false;
            switch (this.constraint) {
                case AFTER -> {
                    flag = mainTime.isAfter(dependencyTime);
                    if (flag) {
                        context.disableDefaultConstraintViolation();
                        context.buildConstraintViolationWithTemplate(
                                        String.format("Start time [%s] must be after end time [%s]", mainTime, dependencyTime)
                                )
                                .addPropertyNode(this.mainField)
                                .addConstraintViolation();
                    }
                    break;
                }
                case BEFORE -> {
                    flag = mainTime.isBefore(dependencyTime);
                    if (flag) {
                        context.disableDefaultConstraintViolation();
                        context.buildConstraintViolationWithTemplate(
                                        String.format("Start time [%s] must be before end time [%s]", mainTime, dependencyTime)
                                )
                                .addPropertyNode(this.mainField)
                                .addConstraintViolation();
                    }
                    break;
                }
                case EQUAL -> {
                    flag = mainTime.equals(dependencyTime);
                    if (flag) {
                        context.disableDefaultConstraintViolation();
                        context.buildConstraintViolationWithTemplate(
                                        String.format("Start time [%s] must be equal to end time [%s]", mainTime, dependencyTime)
                                )
                                .addPropertyNode(this.mainField)
                                .addConstraintViolation();
                    }
                    break;
                }
                case AFTER_OR_EQUAL -> {
                    flag = mainTime.isAfter(dependencyTime) || mainTime.equals(dependencyTime);
                    if (flag) {
                        context.disableDefaultConstraintViolation();
                        context.buildConstraintViolationWithTemplate(
                                        String.format("Start time [%s] must be after or equal to end time [%s]", mainTime, dependencyTime)
                                )
                                .addPropertyNode(this.mainField)
                                .addConstraintViolation();
                    }
                }
                case BEFORE_OR_EQUAL -> {
                    flag = mainTime.isBefore(dependencyTime) || mainTime.equals(dependencyTime);
                    if (flag) {
                        context.disableDefaultConstraintViolation();
                        context.buildConstraintViolationWithTemplate(
                                        String.format("Start time [%s] must be before or equal to end time [%s]", mainTime, dependencyTime)
                                )
                                .addPropertyNode(this.mainField)
                                .addConstraintViolation();
                    }
                    break;
                }

            }
            return flag;

        } catch (NoSuchFieldException | IllegalAccessException e) {
            throw AppException.builder().error(Error.INTERNAL_SERVER_ERROR).build();
        }
    }

}
