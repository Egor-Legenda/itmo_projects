package org.example.demo.controllers;
import jakarta.ejb.Stateless;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ejb.EJB;
import jakarta.ws.rs.core.SecurityContext;
import org.example.demo.dto.PointDTO;
import org.example.demo.dto.UserDTO;
import org.example.demo.services.PointService;
import org.example.demo.services.UserServiceEJB;
import org.example.demo.utils.Point;
import org.example.demo.utils.User;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Path("/points")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Stateless
public class PointController {

    @EJB
    private PointService pointService;

    @GET
    @Path("/user")
    public Response getUserPoints(@Context HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        System.out.println("Сессия: " + session);
        if (session != null) {
            System.out.println("currentUser: " + session.getAttribute("currentUser"));
        }

        if (session == null) {
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity("Вы не авторизованы")
                    .build();
        }

        User user = (User) session.getAttribute("currentUser");
        if (user == null) {
            System.out.println("Упс");
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity("Вы не авторизованы")
                    .build();
        }
        System.out.println("Имя обращающегося к бд"+ user.getUsername());

        List<Point> points = pointService.getPointsByUser(user);
        System.out.println(points.toString());
//        User currentUser = (User) securityContext.getUserPrincipal();
//        List<Point> points = pointService.getPointsByUser(currentUser);
        List<PointDTO> pointDTOS = new ArrayList<>();
        for (Point p: points) {
            pointDTOS.add(new PointDTO(p));
        }
        return Response.ok(pointDTOS).build();
    }

    @POST
    @Path("/add")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addPoint(Point point, @Context HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("currentUser") == null) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
        User user = (User) session.getAttribute("currentUser");
        point.setAuthor(user);
        try {
            Point savedPoint = pointService.savePoint(point);
            System.out.println(savedPoint);
            return Response.ok(new PointDTO(savedPoint)).build();
        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        }
    }

}
