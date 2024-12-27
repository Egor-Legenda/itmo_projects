package org.example.demo.time;

import jakarta.ejb.Stateless;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;

import java.text.SimpleDateFormat;
import java.util.Date;

@Stateless
@Path("/time")
public class TimeEJB {

    @GET
    @Produces("text/plain")
    public String getCurrentTime() {
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
        return sdf.format(new Date());
    }
}
