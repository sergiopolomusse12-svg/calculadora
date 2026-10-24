package com.mss.backend_java;
import org.springframework.stereotype.Component;
@Component 
public class Contrapisos {
    public double volumen(double largo, double ancho, double espesor) {
        return largo * ancho * (espesor / 100);
    }
    public double cemento(double volumen){
        return volumen * 105;
    }
    public double arena(double volumen){
        return volumen * 0.45;
    }
    public double piedra(double volumen){
        return volumen * 0.9;
    }

}
