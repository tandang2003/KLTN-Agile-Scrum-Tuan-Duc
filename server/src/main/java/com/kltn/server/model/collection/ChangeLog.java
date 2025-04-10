package com.kltn.server.model.collection;

import com.kltn.server.model.base.BaseDocument;
import com.kltn.server.model.collection.model.ILog;
import com.kltn.server.model.collection.model.SubTag;
import org.springframework.data.mongodb.core.mapping.Field;

public class ChangeLog extends BaseDocument {
    @Field
    private String type;
    @Field("entity_target")
    private String entityTarget;
    @Field("properties_target")
    private String[] propertiesTargets;
    @Field("id_ref")
    private String idRef;
    @Field("change")
    private ILog change;

    protected ChangeLog(ChangeLogBuilder builder) {
        super(builder);
        this.type = builder.type;
        this.entityTarget = builder.entityTarget;
        this.propertiesTargets = builder.propertiesTargets;
        this.idRef = builder.idRef;
        this.change = builder.change;
    }


    public static class ChangeLogBuilder extends BaseDocument.BaseDocumentBuilder<ChangeLog, ChangeLogBuilder> {
        private String type;
        private String entityTarget;
        private String[] propertiesTargets;
        private String idRef;
        private ILog change;

        public ChangeLogBuilder type(String type) {
            this.type = type;
            return this;
        }

        public ChangeLogBuilder entityTarget(String entityTarget) {
            this.entityTarget = entityTarget;
            return this;
        }

        public ChangeLogBuilder propertiesTargets(String[] propertiesTargets) {
            this.propertiesTargets = propertiesTargets;
            return this;
        }

        public ChangeLogBuilder idRef(String idRef) {
            this.idRef = idRef;
            return this;
        }

        public ChangeLogBuilder change(ILog change) {
            this.change = change;
            return this;
        }

        @Override
        protected ChangeLogBuilder self() {
            return this;
        }

        @Override
        public ChangeLog build() {
            return new ChangeLog(this);
        }
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getEntityTarget() {
        return entityTarget;
    }

    public void setEntityTarget(String entityTarget) {
        this.entityTarget = entityTarget;
    }

    public String[] getPropertiesTargets() {
        return propertiesTargets;
    }

    public void setPropertiesTargets(String[] propertiesTargets) {
        this.propertiesTargets = propertiesTargets;
    }

    public String getIdRef() {
        return idRef;
    }

    public void setIdRef(String idRef) {
        this.idRef = idRef;
    }

    public ILog getChange() {
        return change;
    }

    public void setChange(ILog change) {
        this.change = change;
    }
}
