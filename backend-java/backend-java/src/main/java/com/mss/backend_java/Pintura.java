package com.mss.backend_java;
import org.springframework.stereotype.Component;
@Component 
public class Pintura {
    public double litros(double superficie) {
        return superficie / 6;
    }
}
