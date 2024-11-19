package org.example.g2;

import com.google.gson.Gson;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import static org.example.g2.ControllerServlet.gson;


@WebServlet(name = "AreaCheckServlet", urlPatterns = {"/checkArea"})
public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    private void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            double x = Double.parseDouble(request.getParameter("X"));
            double y = Double.parseDouble(request.getParameter("Y"));
            int r = Integer.parseInt(request.getParameter("R"));

            boolean isHit = isHit(x, y, r);
            HttpSession session = request.getSession();
            List<String[]> results = (List<String[]>) session.getAttribute("results");
            if (results == null) {
                results = new ArrayList<>();
            }

            results.add(new String[]{String.valueOf(x), String.valueOf(y), String.valueOf(r), isHit ? "inside" : "outside"});
            session.setAttribute("results", results);

            request.setAttribute("X", x);
            request.setAttribute("Y", y);
            request.setAttribute("R", r);
            request.setAttribute("isHit", isHit);

            response.setCharacterEncoding("UTF-8");
            response.setContentType("text/html");
            PrintWriter writer = response.getWriter();
            for (String[] result : results) {
                writer.write("<tr>");
                writer.write("<td>" + result[0] + "</td>");
                writer.write("<td>" + result[1] + "</td>");
                writer.write("<td>" + result[2] + "</td>");
                writer.write("<td>" + result[3] + "</td>");
                writer.write("</tr>");
            }
            writer.close();
            // Перенаправляем запрос на result.jsp с установленными атрибутами
            //request.getRequestDispatcher("result.jsp").forward(request, response);

        } catch (NumberFormatException e) {
            request.getRequestDispatcher("./index.jsp").forward(request, response);
        }
    }

    private boolean isHit(double x, double y, int r) {
        return ((x <= r && y >= -r && y <= (-x / 2 + r / 2) && x >= 0) ||
                ((Math.pow(y, 2) + Math.pow(x, 2) <= Math.pow((r / 2), 2)) && y >= 0 && x <= 0));
    }
}
