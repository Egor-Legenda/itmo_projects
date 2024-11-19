package org.example.g2;

import lombok.Getter;

import java.util.LinkedList;
import java.util.List;

public class MapDot {
    @Getter
    private static List<Dot> dots = new LinkedList<>();

    public static void addDot(Dot dot) {
        dots.add(dot);
    }
}
