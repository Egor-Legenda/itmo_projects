package org.example.demo;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Named;

@Named("clockBean")
@ApplicationScoped
public class ClockBean implements Serializable {

    private static final long serialVersionUID = 1L;

    private String currentTime;


    public ClockBean() {

        updateTime();

        new Thread(() -> {
            while (true) {
                try {
                    Thread.sleep(8000);
                    updateTime();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }

    public void updateTime() {
        SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy, HH:mm:ss");
        currentTime = formatter.format(new Date());
    }

    public String getCurrentTime() {
        return currentTime;
    }
}

