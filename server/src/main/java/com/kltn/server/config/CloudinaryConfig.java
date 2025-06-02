package com.kltn.server.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {
    @Value("${app.service.cloudinary.cloud-name}")
    String cloudName;
    @Value("${app.service.cloudinary.api-key}")
    String apiKey;
    @Value("${app.service.cloudinary.api-secret}")
    String apiSecret;
    @Value("${app.service.cloudinary.url-upload}")
    String url;
    @Value("${app.service.cloudinary.root-folder}")
    String rootFolder;


    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap("cloud_name", cloudName, "api_key", apiKey, "api_secret", apiSecret, "access_mode", "public", "secure", true));
    }

    @Bean
    public Transformation transformation() {
        return new Transformation().crop("scale").chain()
                .quality("auto").chain()
                .fetchFormat("auto");
    }

    @Bean("url-upload-file")
    public String urlToUploadFile() {
        return url;
    }

    @Bean("root-folder")
    public String getRootFolder() {
        return rootFolder;
    }
}
