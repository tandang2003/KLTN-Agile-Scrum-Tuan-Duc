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
    protected Instant dtCreated;
    @LastModifiedDate
    @Column(name = "dt_modified")
    protected Instant dtModified;
    @Column(name = "dt_deleted")
    protected Instant dtDeleted;
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
        return deleted == that.deleted && Objects.equals(id, that.id) && Objects.equals(dtCreated, that.dtCreated) && Objects.equals(dtModified, that.dtModified) && Objects.equals(dtDeleted, that.dtDeleted) && Objects.equals(createdBy, that.createdBy) && Objects.equals(modifiedBy, that.modifiedBy) && Objects.equals(deletedBy, that.deletedBy);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, dtCreated, dtModified, dtDeleted, deleted, createdBy, modifiedBy, deletedBy);
    }

    protected BaseEntity(BaseEntityBuilder<?, ?> builder) {
        this.id = builder.id;
        this.dtCreated = builder.dtCreated;
        this.dtModified = builder.dtModified;
        this.dtDeleted = builder.dtDeleted;
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

    public Instant getDtCreated() {
        return dtCreated;
    }

    public void setDtCreated(Instant dtCreated) {
        this.dtCreated = dtCreated;
    }

    public Instant getDtModified() {
        return dtModified;
    }

    public void setDtModified(Instant dtModified) {
        this.dtModified = dtModified;
    }

    public Instant getDtDeleted() {
        return dtDeleted;
    }

    public void setDtDeleted(Instant dtDeleted) {
        this.dtDeleted = dtDeleted;
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
        protected Instant dtStart;
        protected Instant dtEnd;
        protected Instant dtCreated;
        protected Instant dtModified;
        protected Instant dtDeleted;
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

        public R dtStart(Instant dtStart) {
            this.dtStart = dtStart;
            return self();
        }

        public R dtEnd(Instant dtEnd) {
            this.dtEnd = dtEnd;
            return self();
        }

        public R dtCreated(Instant dtCreated) {
            this.dtCreated = dtCreated;
            return self();
        }

        public R dtModified(Instant dtModified) {
            this.dtModified = dtModified;
            return self();
        }

        public R dtDeleted(Instant dtDeleted) {
            this.dtDeleted = dtDeleted;
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

        public String getId() {
            return id;
        }

        public Instant getDtStart() {
            return dtStart;
        }

        public Instant getDtEnd() {
            return dtEnd;
        }

        public Instant getDtCreated() {
            return dtCreated;
        }

        public Instant getDtModified() {
            return dtModified;
        }

        public Instant getDtDeleted() {
            return dtDeleted;
        }

        public boolean isDeleted() {
            return deleted;
        }

        public String getCreatedBy() {
            return createdBy;
        }

        public String getModifiedBy() {
            return modifiedBy;
        }

        public String getDeletedBy() {
            return deletedBy;
        }

        public R deleted(boolean deleted) {
            this.deleted = deleted;
            return self();

        }

        protected abstract R self();

        public abstract T build();

    }
}
