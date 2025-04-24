package com.kltn.server.config.properties;

public class CacheModel {
    private String keySerializer;
    private String valueSerializer;
    private String hashKeySerializer;
    private String hashValueSerializer;

    public CacheModel() {
    }

    private CacheModel(CacheModelBuilder builder) {
        this.keySerializer = builder.keySerializer;
        this.valueSerializer = builder.valueSerializer;
        this.hashKeySerializer = builder.hashKeySerializer;
        this.hashValueSerializer = builder.hashValueSerializer;
    }

    public static CacheModelBuilder builder() {
        return new CacheModelBuilder();
    }

    public static class CacheModelBuilder {
        private String keySerializer;
        private String valueSerializer;
        private String hashKeySerializer;
        private String hashValueSerializer;

        public CacheModelBuilder keySerializer(String keySerializer) {
            this.keySerializer = keySerializer;
            return this;
        }

        public CacheModelBuilder valueSerializer(String valueSerializer) {
            this.valueSerializer = valueSerializer;
            return this;
        }

        public CacheModelBuilder hashKeySerializer(String hashKeySerializer) {
            this.hashKeySerializer = hashKeySerializer;
            return this;
        }

        public CacheModelBuilder hashValueSerializer(String hashValueSerializer) {
            this.hashValueSerializer = hashValueSerializer;
            return this;
        }

        public CacheModel build() {
            return new CacheModel(this);
        }
    }


    public String getKeySerializer() {
        return keySerializer;
    }

    public void setKeySerializer(String keySerializer) {
        this.keySerializer = keySerializer;
    }

    public String getValueSerializer() {
        return valueSerializer;
    }

    public void setValueSerializer(String valueSerializer) {
        this.valueSerializer = valueSerializer;
    }

    public String getHashKeySerializer() {
        return hashKeySerializer;
    }

    public void setHashKeySerializer(String hashKeySerializer) {
        this.hashKeySerializer = hashKeySerializer;
    }

    public String getHashValueSerializer() {
        return hashValueSerializer;
    }

    public void setHashValueSerializer(String hashValueSerializer) {
        this.hashValueSerializer = hashValueSerializer;
    }
}
