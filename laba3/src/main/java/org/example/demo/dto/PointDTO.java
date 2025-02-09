package org.example.demo.dto;

import org.example.demo.utils.Point;

public class PointDTO {
    private Long id;
    private Double x;
    private Double y;
    private Double r;
    private Boolean hit;
    private String authorUsername;

    public PointDTO(Point point) {
        this.id = point.getId();
        this.x = point.getX();
        this.y = point.getY();
        this.r = point.getR();
        this.hit = point.isHit();
        this.authorUsername = point.getAuthor().getUsername();
    }



    public void setId(Long id) {
        this.id = id;
    }

    public void setX(Double x) {
        this.x = x;
    }

    public void setY(Double y) {
        this.y = y;
    }

    public void setR(Double r) {
        this.r = r;
    }

    public void setHit(Boolean hit) {
        this.hit = hit;
    }

    public void setAuthorUsername(String authorUsername) {
        this.authorUsername = authorUsername;
    }

    public Long getId() {
        return id;
    }

    public Double getX() {
        return x;
    }

    public Double getY() {
        return y;
    }

    public Double getR() {
        return r;
    }

    public Boolean getHit() {
        return hit;
    }

    public String getAuthorUsername() {
        return authorUsername;
    }
}
