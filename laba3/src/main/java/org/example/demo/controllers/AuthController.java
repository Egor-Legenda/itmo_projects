package org.example.demo.controllers;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ejb.EJB;
import org.example.demo.dto.UserDTO;
import org.example.demo.services.UserServiceEJB;
import org.example.demo.utils.User;

import java.util.ArrayList;
import java.util.List;

@Path("/auth")
public class AuthController {
    List<String> usersNames = new ArrayList<>();
    @EJB
    private UserServiceEJB userService;

    // Регистрация пользователя
    @POST
    @Path("/register")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response register(UserDTO userDTO, @Context HttpServletRequest request) {
        System.out.println(userDTO.getUsername());
        System.out.println(userDTO.toString());
        try {


            User user = userService.registerUser(userDTO.getUsername(), userDTO.getPassword());

            HttpSession session = request.getSession(true);
            session.setAttribute("currentUser", user);
            return Response.ok().build();
        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Пользователь с таким именем уже существует")
                    .build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Произошла ошибка при регистрации")
                    .build();
        }
    }

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(UserDTO userDTO, @Context HttpServletRequest request) {
        User user = userService.authenticateUser(userDTO.getUsername(), userDTO.getPassword());
        if (user != null) {
            HttpSession session = request.getSession(true);


            session.setAttribute("currentUser", user);
            return Response.ok().build();
        } else {
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity("Неверное имя пользователя или пароль")
                    .build();
        }
    }

    @POST
    @Path("/logout")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response logout(@Context HttpServletRequest request) {

        try {

            HttpSession session = request.getSession(false);
            if (session != null) {
                session.invalidate();
                System.out.println("Сессия удалена.");
            }

            return Response.ok("{\"message\": \"Logout successful\"}").build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"message\": \"Server error occurred\"}")
                    .build();
        }
    }


    @GET
    @Path("/check-session")
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response checkSession(@Context HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            User user = (User) session.getAttribute("currentUser");

            if (user != null) {

                return Response.ok(user).build();
            }
        }
        return Response.status(Response.Status.UNAUTHORIZED).entity("Сессия неактивна").build();
    }
}
