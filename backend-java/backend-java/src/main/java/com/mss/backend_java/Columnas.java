package com.mss.backend_java;
import org.springframework.stereotype.Component;
@Component 
public class Columnas {
    public double cemento(double largo){
        return largo * 7.5;
    }
    public double arena(double largo){
        return largo * 0.016;
    }
    public double piedra(double largo){
        return largo * 0.016;
    }
    public double hierro10(double largo){
        return largo * 6;
    }
    public double hierro4(double largo){
        return largo * 3;
    }
}
