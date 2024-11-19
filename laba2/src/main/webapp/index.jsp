<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%
  List<String[]> results = (List<String[]>) session.getAttribute("results");
  if (results == null) {
    results = new ArrayList<>();
  }

%>

<!DOCTYPE html>
<html lang="ru" xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html">
<head>

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>График на Canvas</title>

  <style>
    canvas {
      border: 1px solid black;
    }
  </style>
  <link rel="stylesheet" href="styles.css">

</head>
<body>
<h1 class="style"> Щукин Егор Вячеславович P3214 409929</h1>

<h2 class="style">
  <canvas id="graphCanvas" width="400" height="400"></canvas>
  <br>
  <div class="container">
    <form action="${pageContext.request.contextPath}/controller" method="GET">
<%--      X: <input type="text" name="X"><br>--%>
<%--      Y: <input type="text" name="Y"><br>--%>
<%--      R: <input type="text" name="R"><br>--%>
<%--      <input type="submit" value="Check">--%>

      <div class="block">
        <!-- Выбор x через radio -->
        <label>Выберите значение x:</label><br>
        <input type="radio" id="xInput1" name="X" value="-5">
        <label for="xInput1">-5</label>

        <input type="radio" id="xInput2" name="X" value="-4">
        <label for="xInput2">-4</label>

        <input type="radio" id="xInput3" name="X" value="-3">
        <label for="xInput3">-3</label>

        <input type="radio" id="xInput4" name="X" value="-2">
        <label for="xInput4">-2</label>

        <input type="radio" id="xInput5" name="X" value="-1">
        <label for="xInput5">-1</label>

        <input type="radio" id="xInput6" name="X" value="0">
        <label for="xInput6">0</label>

        <input type="radio" id="xInput7" name="X" value="1">
        <label for="xInput7">1</label>

        <input type="radio" id="xInput8" name="X" value="2">
        <label for="xInput8">2</label>

        <input type="radio" id="xInput9" name="X" value="3">
        <label for="xInput9">3</label>
        <br>
      </div>

      <div class="block">
        <!-- Ввод Y через текст -->
        <label for="yInput">Введите значение y:</label><br>
        <input type="text" id="yInput" name="Y">
        <br>
      </div>
      <div id="tooltip" class="tooltip">Введите правильные значения</div>
      <div class="block">
        <!-- Ввод R через баттон-->
        <label for="rInput">Выберите значение r:</label><br>
        <div id="buttons">
          <button type="button" value="1" onclick="setValue(1)">1</button>
          <button type="button" value="2" onclick="setValue(2)">2</button>
          <button type="button" value="3" onclick="setValue(3)">3</button>
          <button type="button" value="4" onclick="setValue(4)">4</button>
          <button type="button" value="5" onclick="setValue(5)">5</button>
        </div>
        <input type="hidden" id="rInput" name="R" required>

      </div>


    </form>
    <div class="block">
      <button class="style" onclick="create_dot()">Создать точку</button>
    </div>
  </div>
  </div>
</h2>

<root>
  <table id ="table_shot">
    <tr>
      <td>x</td>
      <td>y</td>
      <td>r</td>
      <td>check</td>

      <%
    String r = "2";
    for (String[] result: results){
        String x = result[0];
        String y = result[1];
        r = result[2];
        String check = result[3];
      %><tr>

    <td><%= x %></td>
    <td><%= y %></td>
    <td><%= r %></td>
    <td><%= check %></td>
  </tr>
    <%}%>
    </tr>
  </table>
</root>
<script defer src="main.js"></script>
<script>

  function setValue(value) {
    document.getElementById('rInput').value = value;
    draw_Graph();

    const results = [
      <% for (String[] result : results) { %>
      ["<%= result[0] %>", "<%= result[1] %>"],
      <% } %>
    ];

    results.forEach(([x, y]) => {
      draw_dot(x, y);
    });
  }


  document.addEventListener("DOMContentLoaded", function() {
    setValue(<%= r %>);
    return false;
  });
</script>
</body>
</html>