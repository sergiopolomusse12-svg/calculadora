package com.mss.backend_java;
import org.springframework.stereotype.Component;
@Component
public class Techos {
    public double area(double largo, double ancho){
        return largo *ancho;
    }
    public double cemento(double area){
        return area * 33;
    }
    public double arena(double area){
        return area * 0.072;
    }
    public double piedra(double area){
        return area * 0.072;
    }
    public double hierro8(double area){
        return area * 7;
    }
    public double hierro6(double area){
        return area * 4;
    }
}
