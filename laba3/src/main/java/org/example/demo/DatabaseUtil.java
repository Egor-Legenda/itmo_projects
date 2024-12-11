package org.example.demo;

import jakarta.jws.soap.SOAPBinding;

import javax.naming.Context;
import javax.naming.InitialContext;
import java.io.Serializable;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import javax.naming.NamingException;
import javax.sql.DataSource;



public class DatabaseUtil implements Serializable {

//    public static final String URL = "jdbc:postgresql://localhost:5432/web3";
//    public static final String USER = "postgres";
//    public static final String PASSWORD = "20052005";

//  public static final String URL = "jdbc:postgresql://localhost:5432/studs";
//    public static final String USER = "s409929";
//    public static final String PASSWORD = "JAQBQLTOKxcFWmVg";


  public static Connection getConnection() {

      try {
          Context ctx = new InitialContext();
          DataSource ds = (DataSource) ctx.lookup("java:/jdbc/PostgresDS");
          return ds.getConnection();
      } catch (NamingException | SQLException e) {
          e.printStackTrace();
          System.out.println("Ошибка при получении подключения: " + e.getMessage());
          return null;
      }
//    return DriverManager.getConnection(URL, USER, PASSWORD);
  }



}