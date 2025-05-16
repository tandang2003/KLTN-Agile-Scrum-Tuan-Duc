package com.kltn.server.service.entity;

import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.model.entity.Resource;
import com.kltn.server.repository.entity.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResourceService {
    private ResourceRepository repository;

    @Autowired
    public ResourceService(ResourceRepository repository) {
        this.repository = repository;
    }

    public Resource getById(String id) {
        return repository.findById(id).orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build());
    }
}
