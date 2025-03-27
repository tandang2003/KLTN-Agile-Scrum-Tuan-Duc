package com.kltn.server.model.base;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.util.Objects;


@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    protected String id;
    @CreatedDate
    @Column(name = "dt_created", nullable = false, updatable = false)
    protected Instant DTCreated;
    @LastModifiedDate
    @Column(name = "dt_modified")
    protected Instant DTModified;
    @Column(name = "dt_deleted")
    protected Instant DTDeleted;
    @Column(name = "is_deleted")
    protected boolean deleted;
    @CreatedBy
    @Column(name = "create_by")
    protected String createdBy;
    @LastModifiedBy
    @Column(name = "modified_by")
    protected String modifiedBy;
    @Column(name = "deleted_by")
    protected String deletedBy;

    protected BaseEntity() {
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof BaseEntity that)) return false;
        return deleted == that.deleted && Objects.equals(id, that.id) && Objects.equals(DTCreated, that.DTCreated) && Objects.equals(DTModified, that.DTModified) && Objects.equals(DTDeleted, that.DTDeleted) && Objects.equals(createdBy, that.createdBy) && Objects.equals(modifiedBy, that.modifiedBy) && Objects.equals(deletedBy, that.deletedBy);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, DTCreated, DTModified, DTDeleted, deleted, createdBy, modifiedBy, deletedBy);
    }

    protected BaseEntity(BaseEntityBuilder<?, ?> builder) {
        this.id = builder.id;
        this.DTCreated = builder.DTCreated;
        this.DTModified = builder.DTModified;
        this.DTDeleted = builder.DTDeleted;
        this.deleted = builder.deleted;
        this.createdBy = builder.createdBy;
        this.modifiedBy = builder.modifiedBy;
        this.deletedBy = builder.deletedBy;

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Instant getDTCreated() {
        return DTCreated;
    }

    public void setDTCreated(Instant DTCreated) {
        this.DTCreated = DTCreated;
    }

    public Instant getDTModified() {
        return DTModified;
    }

    public void setDTModified(Instant DTModified) {
        this.DTModified = DTModified;
    }

    public Instant getDTDeleted() {
        return DTDeleted;
    }

    public void setDTDeleted(Instant DTDeleted) {
        this.DTDeleted = DTDeleted;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getModifiedBy() {
        return modifiedBy;
    }

    public void setModifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public String getDeletedBy() {
        return deletedBy;
    }

    public void setDeletedBy(String deletedBy) {
        this.deletedBy = deletedBy;
    }

    public abstract static class BaseEntityBuilder<T, R extends BaseEntityBuilder<T, R>> {
        protected String id;
        protected Instant DTStart;
        protected Instant DTEnd;
        protected Instant DTCreated;
        protected Instant DTModified;
        protected Instant DTDeleted;
        protected boolean deleted;
        protected String createdBy;
        protected String modifiedBy;
        protected String deletedBy;

        protected BaseEntityBuilder() {
        }

        public R id(String id) {
            this.id = id;
            return self();
        }

        public R DTStart(Instant DTStart) {
            this.DTStart = DTStart;
            return self();
        }

        public R DTEnd(Instant DTEnd) {
            this.DTEnd = DTEnd;
            return self();
        }

        public R DTCreated(Instant DTCreated) {
            this.DTCreated = DTCreated;
            return self();
        }

        public R DTModified(Instant DTModified) {
            this.DTModified = DTModified;
            return self();
        }

        public R DTDeleted(Instant DTDeleted) {
            this.DTDeleted = DTDeleted;
            return self();
        }

        public R deletedBy(String deletedBy) {
            this.deletedBy = deletedBy;
            return self();
        }

        public R createdBy(String createdBy) {
            this.createdBy = createdBy;
            return self();
        }

        public R modifiedBy(String modifiedBy) {
            this.modifiedBy = modifiedBy;
            return self();
        }

        public R deleted(boolean deleted) {
            this.deleted = deleted;
            return self();
        }

        protected abstract R self();

        public abstract T build();

    }
}
