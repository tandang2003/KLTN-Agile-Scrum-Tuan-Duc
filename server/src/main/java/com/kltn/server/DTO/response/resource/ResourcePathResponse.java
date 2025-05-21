package com.kltn.server.DTO.response.resource;

public record ResourcePathResponse(String path, long size) {
    public static ResourcePathResponseBuilder builder() {
        return new ResourcePathResponseBuilder();
    }

    public static class ResourcePathResponseBuilder {
        private String path;
        private long size;

        public ResourcePathResponseBuilder path(String path) {
            this.path = path;
            return this;
        }

        public ResourcePathResponseBuilder size(long size) {
            this.size = size;
            return this;
        }

        public ResourcePathResponse build() {
            return new ResourcePathResponse(this.path, this.size);
        }
    }


}
