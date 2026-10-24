package com.mss.backend_java;
import org.springframework.stereotype.Component;
@Component 
public class Pisos {
    public double superficie(double ancho, double largo) {
        return ancho * largo;
    }

    public double superficieR(double superficie) {
        return superficie * 1.10;
    }
}

