package com.kltn.server.DTO.request.base;

public class SubTaskRequest {
    private String name;
    private int order;
    private boolean checked;

    public SubTaskRequest() {
    }

    public SubTaskRequest(SubTaskRequestBuilder builder) {
        this.checked = builder.checked;
        this.name = builder.name;
        this.order = builder.order;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }

    public static SubTaskRequestBuilder builder() {
        return new SubTaskRequestBuilder();
    }

    public static class SubTaskRequestBuilder {
        private String name;
        private int order;
        private boolean checked;

        public SubTaskRequestBuilder name(String name) {
            this.name = name;
            return this;
        }

        public SubTaskRequestBuilder order(int order) {
            this.order = order;
            return this;
        }

        public SubTaskRequestBuilder checked(boolean checked) {
            this.checked = checked;
            return this;
        }

        public SubTaskRequest build() {
            return new SubTaskRequest(this);
        }
    }
}
