package com.kltn.server.util.validation;

import com.kltn.server.util.constant.DateConstraint;
import com.kltn.server.util.validation.validator.ValidTimeRange;
import jakarta.validation.Constraint;

import java.lang.annotation.*;


@Constraint(validatedBy = ValidTimeRange.class)
@Target(ElementType.TYPE)  // Applied to classes
@Retention(RetentionPolicy.RUNTIME)
@Repeatable(ValidTimeRangeValidator.ValidTimeRanges.class)
public @interface ValidTimeRangeValidator {

    String message() default "Invalid time range";

    String mainField();

    String dependencyField() default "";

    DateConstraint constraint() default DateConstraint.BEFORE_OR_EQUAL;


    Class<?>[] groups() default {};

    Class<? extends jakarta.validation.Payload>[] payload() default {};

    @Target(ElementType.TYPE)
    @Retention(RetentionPolicy.RUNTIME)
    public @interface ValidTimeRanges {
        ValidTimeRangeValidator[] value();
    }
}
