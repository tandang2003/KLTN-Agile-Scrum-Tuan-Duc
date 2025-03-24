package com.kltn.server.model.collection;

import com.kltn.server.model.base.BaseDocument;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Objects;

//@Document(collection = "tags")
public class Tag extends BaseDocument {
    //    private String id;
    private String name;
    private String color;

    public Tag(TagBuilder tagBuilder) {
        super(tagBuilder);
        this.name = tagBuilder.name;
        this.color = tagBuilder.color;
    }

    public TagBuilder builder() {
        return new TagBuilder();
    }

    public static class TagBuilder extends BaseDocumentBuilder<Tag, TagBuilder> {
        private String name;
        private String color;

        public TagBuilder() {
        }

        public TagBuilder name(String name) {
            this.name = name;
            return this;
        }

        public TagBuilder color(String color) {
            this.color = color;
            return this;
        }

        @Override
        protected TagBuilder self() {
            return this;
        }

        @Override
        public Tag build() {
            return new Tag(this);
        }
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Tag tag)) return false;
        if (!super.equals(o)) return false;
        return Objects.equals(name, tag.name) && Objects.equals(color, tag.color);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), name, color);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}
