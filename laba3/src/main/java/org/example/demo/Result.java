package org.example.demo;

public class Result {
    private Double x;
    private Double y;
    private Integer r;
    private boolean hit;

    public boolean isHit() {
        return hit;
    }


    public void setHit(boolean hit) {
        this.hit = hit;
    }

    public Double getX() {
        return x;
    }

    public Double getY() {
        return y;
    }

    public Integer getR() {
        return r;
    }


    public void setX(Double x) {
        this.x = x;
    }

    public void setY(Double y) {
        this.y = y;
    }

    public void setR(Integer r) {
        this.r = r;
    }


    @Override
    public String toString() {
        return "Result{" +
                "x=" + x +
                ", y=" + y +
                ", r=" + r +
                ", isHit=" + hit +
                '}';
    }

    public Result(Double x, Double y, Integer r, boolean hit) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.hit = hit;
    }

    public static boolean dotIsHit(double x, double y, int r) {
        double halfR = r / 2.0;
        return (((x <= (halfR)) && (y >= 0) && (x >= 0) && (y <= r)) || ((Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r, 2)) && (x >= 0) && (y <= 0)) || ((y <= x / 2 + halfR) && (x <= 0) && (y >= 0)));
    }


}
