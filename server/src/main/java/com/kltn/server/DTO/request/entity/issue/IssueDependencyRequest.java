package com.kltn.server.DTO.request.entity.issue;

public class IssueDependencyRequest {
    private String mainId;
    private String blockId;
    private String sprintBlockId;

    public String getMainId() {
        return mainId;
    }

    public void setMainId(String mainId) {
        this.mainId = mainId;
    }

    public String getBlockId() {
        return blockId;
    }

    public void setBlockId(String blockId) {
        this.blockId = blockId;
    }

    public String getSprintBlockId() {
        return sprintBlockId;
    }

    public void setSprintBlockId(String sprintBlockId) {
        this.sprintBlockId = sprintBlockId;
    }
}
