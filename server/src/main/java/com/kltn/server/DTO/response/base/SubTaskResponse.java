package com.kltn.server.DTO.response.base;

import org.bson.types.ObjectId;

public record SubTaskResponse(ObjectId id, String name, int order, boolean checked) {

    public static SubTaskResponseBuilder builder() {
        return new SubTaskResponseBuilder();
    }

    public static class SubTaskResponseBuilder {
        private ObjectId id;
        private String name;
        private int order;
        private boolean checked;

        public SubTaskResponseBuilder setId(ObjectId id) {
            this.id = id;
            return this;
        }

        public SubTaskResponseBuilder setName(String name) {
            this.name = name;
            return this;
        }

        public SubTaskResponseBuilder setOrder(int order) {
            this.order = order;
            return this;
        }

        public SubTaskResponseBuilder setChecked(boolean checked) {
            this.checked = checked;
            return this;
        }

        public SubTaskResponse build() {
            return new SubTaskResponse(id, name, order, checked);
        }
    }


}
