package org.example.g2;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;

import jakarta.servlet.annotation.WebServlet;
import com.google.gson.Gson;


import java.io.*;
import java.util.ArrayList;
import java.util.List;


@WebServlet(name = "ControllerServlet", urlPatterns = {"/controller"})
public class ControllerServlet extends HttpServlet {
    public static final Gson gson = new Gson();
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        processRequest(req, resp);
    }

    public void processRequest(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        String xParam = req.getParameter("X");
        String yParam = req.getParameter("Y");
        String rParam = req.getParameter("R");
        double x;
        double y;
        int r;
        try {
            x = Double.parseDouble(xParam);
            y = Double.parseDouble(yParam);
            r = Integer.parseInt(rParam);
        } catch (NumberFormatException e){
            error(resp, "данные не являются числами");
            return;
        }
//        if (x > 3 || x < -5) {
//            error(resp, "ошибка в воде x");
//            return;
//        } else
        if (y > 5 || y < -5) {
            error(resp, "ошибка в воде y");
            return;
        } else if (r > 5 || r < 1) {
            error(resp, "ошибка в воде r");
            return;
        }
        req.getRequestDispatcher("/checkArea").forward(req, resp);

    }
    public void error(HttpServletResponse resp, String err) throws IOException {
        String message = gson.toJson("Ошибка в том, что " + err);
        resp.setContentType("application/json");
        resp.getWriter().write(message);
        resp.setStatus(400);
    }


}

