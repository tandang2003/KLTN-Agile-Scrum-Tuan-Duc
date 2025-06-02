package com.kltn.server.DTO.response.resource;

public record ResourceSignatureResponse(
        String folder,
        String signature,
        String name,
        String timestamp,
        String apiKey,
        String cloudName,
        String url
) {
}
