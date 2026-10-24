package com.mss.backend_java;

public class Registro {
    private String usuario;
    private String contrasena;
    private String contrasenaConfirmada;

    public Registro() {
    }

    public Registro(String usuario, String contrasena, String contrasenaConfirmada) {
        this.usuario = usuario;
        this.contrasena = contrasena;
        this.contrasenaConfirmada = contrasenaConfirmada;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public String getContrasenaConfirmada() {
        return contrasenaConfirmada;
    }

    public void setContrasenaConfirmada(String contrasenaConfirmada) {
        this.contrasenaConfirmada = contrasenaConfirmada;
    }
}
