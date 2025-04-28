package com.kltn.server.DTO.response;

import java.util.List;

public class ApiPaging<T> {
    private List<T> items;
    //    private int currentPage;
    private int currentPage;
    //    private long totalElements;
    private int totalPages;
    private long totalItems;

    public ApiPaging(List<T> items, int currentPage, int totalPages, long totalItems) {
        this.items = items;
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.totalItems = totalItems;
    }

    private ApiPaging(ApiPagingBuilder<T> builder) {
        this.items = builder.items;
        this.currentPage = builder.currentPage;
        this.totalPages = builder.totalPages;
        this.totalItems = builder.totalItems;
    }

    public static <T> ApiPagingBuilder<T> builder() {
        return new ApiPagingBuilder<T>();
    }

    public static class ApiPagingBuilder<T> {
        private List<T> items;
        private int currentPage;
        //        private long totalElements;
        private int totalPages;
        private long totalItems;

        public ApiPagingBuilder<T> totalItems(long totalItems) {
            this.totalItems = totalItems;
            return this;
        }

        public ApiPagingBuilder<T> items(List<T> items) {
            this.items = items;
            return this;
        }

        public ApiPagingBuilder<T> currentPage(int currentPage) {
            this.currentPage = currentPage;
            return this;
        }

//        public ApiPagingBuilder totalElements(long totalElements) {
//            this.totalElements = totalElements;
//            return this;
//        }

        public ApiPagingBuilder<T> totalPages(int totalPages) {
            this.totalPages = totalPages;
            return this;
        }

        public ApiPaging<T> build() {
            return new ApiPaging<T>(this);
        }
    }

    public int getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }
//
//    public long getTotalElements() {
//        return totalElements;
//    }
//
//    public void setTotalElements(long totalElements) {
//        this.totalElements = totalElements;
//    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public List<T> getItems() {
        return items;
    }

    public void setItems(List<T> items) {
        this.items = items;
    }

    public long getTotalItems() {
        return totalItems;
    }

    public void setTotalItems(long totalItems) {
        this.totalItems = totalItems;
    }
}
