package com.kltn.server.model.collection.model;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Field;

public class SubTask {
    private ObjectId id;
    @Field
    private String name;
    @Field
    private int order;
    @Field
    private boolean checked;

    public SubTask() {
    }

    private SubTask(SubTagBuilder builder) {
        this.id = builder.id;
        this.name = builder.name;
        this.order = builder.order;
        this.checked = builder.checked;
    }

    public static SubTagBuilder builder() {
        return new SubTagBuilder();
    }


    public static class SubTagBuilder {
        private ObjectId id;
        private String name;
        private int order;
        private boolean checked;

        public SubTagBuilder setName(String name) {
            this.name = name;
            return this;
        }

        public SubTagBuilder setOrder(int order) {
            this.order = order;
            return this;
        }

        public SubTagBuilder setChecked(boolean checked) {
            this.checked = checked;
            return this;
        }

        public void prePersist() {
            if (this.id == null) {
                this.id = new ObjectId();
            }
        }

        public SubTask build() {
            prePersist();
            return new SubTask(this);
        }
    }

    public String getName() {
        return name;
    }

    public int getOrder() {
        return order;
    }

    public boolean isChecked() {
        return checked;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setOrder(int order) {
        this.order = order;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }
}
