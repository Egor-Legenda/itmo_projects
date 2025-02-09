package org.example.demo.util;

import org.example.demo.filters.CORSFilter;

import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

@ApplicationPath("/rest-server")
public class WebApplication extends Application {
}
