package com.kltn.server.config;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CheckingAllFilter implements CommandLineRunner {
    @Autowired
    SecurityFilterChain filterChain;
//
    @Override
    public void run(String... args) throws Exception {
        List<Filter> filters =filterChain.getFilters();
        filters.forEach(f->{
            System.out.println(f.getClass().getSimpleName());
        });
    }
}
