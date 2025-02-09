package org.example.demo.services;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.example.demo.utils.Point;
import org.example.demo.utils.User;

import java.util.List;

@Stateless
public class PointService {

    @PersistenceContext(unitName = "myPU")
    private EntityManager entityManager;


    public List<Point> getPointsByUser(User user) {
        if (user == null) {
            throw new IllegalArgumentException("User cannot be null");
        }
        System.out.println("User get" + user.getUsername());
        return entityManager.createQuery(
                        "SELECT p FROM Point p WHERE p.author = :user", Point.class)
                .setParameter("user", user)
                .getResultList();
    }

    public Point savePoint(Point point) {
        if (point == null) {
            throw new IllegalArgumentException("Point cannot be null");
        }
        if (point.getAuthor() == null) {
            throw new IllegalArgumentException("Point must have an associated author");
        }

        if (!isValidPoint(point)) {
            throw new IllegalArgumentException("Point coordinates or radius are out of bounds");
        }
        point.setHit(isHit(point));

        entityManager.persist(point);
        return point;
    }


    private boolean isValidPoint(Point point) {
        return point.getR() >= -2 && point.getR() <= 2 &&
                point.getX() >= -5 && point.getX() <= 5 &&
                point.getY() >= -5 && point.getY() <= 5;
    }

    private boolean isHit(Point point) {
        if (point.getR() >= 0) {
            return ((Math.pow(point.getX(), 2) + Math.pow(point.getY(), 2) <= Math.pow(point.getR(), 2) && (point.getX() <= 0) && (point.getY() >= 0)) ||
                    ((point.getX()>=0) && (point.getX() <= point.getR()/2) && (point.getY()>=0) && (point.getY() <= point.getR()))  ||
                    ((point.getX()>=0)&& (point.getY()<=0)) && (point.getY() >= 2* point.getX() - point.getR()));
        }
        return ((Math.pow(point.getX(), 2) + Math.pow(point.getY(), 2) <= Math.pow(Math.abs(point.getR()), 2) && (point.getX() >= 0) && (point.getY() <= 0)) ||
                ((point.getX()<=0) && (point.getX() >= -(Math.abs(point.getR())/2)) && (point.getY()<=0) && (point.getY() >= -Math.abs(point.getR())))  ||
                ((point.getX()<=0)&& (point.getY()>=0)) && (point.getY() <= 2* point.getX() + (Math.abs(point.getR()))));
    }
}

