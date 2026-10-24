package com.mss.backend_java;
import org.springframework.stereotype.Component;
@Component 
public class Viga{
    public double cemento(double largo){
        return largo * 9;
    }
    public double arena(double largo){
        return largo * 0.02;
    }
    public double piedra(double largo){
        return largo * 0.02;
    }
    public double hierro8(double largo){
        return largo * 4;
    }
    public double hierro4(double largo){
        return largo * 3;
    }
}
