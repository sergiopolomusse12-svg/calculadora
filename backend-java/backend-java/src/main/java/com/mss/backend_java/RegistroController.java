package com.mss.backend_java;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
@Controller
public class RegistroController {
    private final RegistroUsuario registroUsuario;
    private final InicioSesion inicioSesion;
    public RegistroController(RegistroUsuario registroUsuario, InicioSesion inicioSesion){
        this.registroUsuario = registroUsuario;
        this.inicioSesion = inicioSesion;
    }
    @PostMapping ("/api/registrarse")
    public String registrarse(@ModelAttribute Registro registro, Model model) {
        try{
            registroUsuario.registrarse(registro);
            return "redirect:/index.html";
        } catch (IllegalArgumentException e) {
            model.addAttribute("error", e.getMessage());
            return "Registrarse";
        }
    }
    @GetMapping("/Registrarse.html")
    public String mostrarFormularioRegistro() {
        return "Registrarse";
    }
    @PostMapping("/api/iniciar-sesion")
    public String iniciarSesion(@ModelAttribute Registro registro, Model model){
        boolean valido = inicioSesion.validar(registro.getUsuario(), registro.getContrasena());
        if (valido){
            return "redirect:/calculadora2.html";
        } 
        model.addAttribute("error", "Usuario o contraseña incorrectos");
        return "index";
    }
    @GetMapping({"/", "/index.html"})
    public String mostrarInicio(){
        return "index";
    }
}
