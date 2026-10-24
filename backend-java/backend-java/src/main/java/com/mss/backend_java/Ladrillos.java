package com.mss.backend_java;
import org.springframework.stereotype.Component;
@Component 
public class Ladrillos {
    public double medida(double largo, double alto){
        return largo * alto;

    }
    public double cemento(double superficie, int espesor){
        if (espesor == 30) {
            return superficie * 15.2;

        } else {
            return superficie * 10.9;
        }
    }
    public double arena(double superficie, int espesor){
        if (espesor == 30){
            return superficie * 0.115;
        } else {
            return superficie * 0.09;
        }
    } 
    public int ladrillos(double superficie, int espesor){
        if (espesor == 30){
            return (int) Math.ceil(superficie * 120);
        } else {
            return (int) Math.ceil(superficie * 90);
        }
    }
}

