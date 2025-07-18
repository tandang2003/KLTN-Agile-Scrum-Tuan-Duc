package com.kltn.server.DTO.response.resource;

public record ResourceSignatureResponse(
                String folder,
                String signature,
                String timestamp,
                String apiKey,
                String cloudName,
                String url) {
}
