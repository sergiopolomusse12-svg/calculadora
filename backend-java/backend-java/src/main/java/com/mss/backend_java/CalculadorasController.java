package com.mss.backend_java;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.ui.Model;
@Controller 
public class CalculadorasController {
    private final Ladrillos ladrillos;
    private final Viga viga;
    private final Columnas columnas;
    private final Contrapisos contrapisos;
    private final Techos techos;
    private final Pisos pisos;
    private final Pintura pintura;
    public CalculadorasController(Ladrillos ladrillos, Viga viga, Columnas columnas, Contrapisos contrapisos, Techos techos, Pisos pisos, Pintura pintura){
        this.ladrillos = ladrillos;
        this.viga = viga;
        this.columnas = columnas;
        this.contrapisos = contrapisos;
        this.techos = techos;
        this.pisos = pisos;
        this.pintura = pintura;
    }
    @PostMapping ("/calcular-muro")
    public String calcularMuro(@RequestParam int espesor, @RequestParam double largo, @RequestParam double alto, Model model){
        double superficie = ladrillos.medida(largo, alto); 
        double cemento = ladrillos.cemento(superficie, espesor);
        double arena = ladrillos.arena(superficie, espesor);
        int cantidadLadrillos = ladrillos.ladrillos(superficie, espesor);
        model.addAttribute("superficie", superficie);
        model.addAttribute("cemento", cemento);
        model.addAttribute("arena", arena);
        model.addAttribute("cantidadLadrillos", cantidadLadrillos);
        return "ladrillos";
    }
    @GetMapping ("/ladrillos")
    public String mostrarLadrillos(){
        return "ladrillos";
    }

    @PostMapping ("/calcular-viga")
    public String calcularViga(@RequestParam double largo, Model model){
        double cemento = viga.cemento(largo);
        double arena = viga.arena(largo);
        double piedra = viga.piedra(largo);
        double hierro8 = viga.hierro8(largo);
        double hierro4 = viga.hierro4(largo);
        model.addAttribute("cemento", cemento);
        model.addAttribute("arena", arena);
        model.addAttribute("piedra", piedra);
        model.addAttribute("hierro8", hierro8);
        model.addAttribute("hierro4", hierro4);
        return "viga";
    }
    @GetMapping ("/viga")
    public String mostrarViga(){
        return "viga";
    }

    @PostMapping ("/calcular-columnas")
    public String calcularColumnas(@RequestParam double largo, Model model){
        double cemento = columnas.cemento(largo);
        double arena = columnas.arena(largo);
        double piedra = columnas.piedra(largo);
        double hierro10 = columnas.hierro10(largo);
        double hierro4 = columnas.hierro4(largo);
        model.addAttribute("cemento", cemento);
        model.addAttribute("arena", arena);
        model.addAttribute("piedra", piedra);
        model.addAttribute("hierro10", hierro10);
        model.addAttribute("hierro4", hierro4);
        return "columnas";
    }
    @GetMapping("/columnas")
    public String mostrarColumnas(){
        return "columnas";
    }

    @PostMapping ("/calcular-contrapisos")
    public String calcularContrapisos(@RequestParam double largo, @RequestParam double ancho, @RequestParam double espesor, Model model){
        double volumen = contrapisos.volumen(largo, ancho, espesor);
        double cemento = contrapisos.cemento(volumen);
        double arena = contrapisos.arena(volumen);
        double piedra = contrapisos.piedra(volumen);
        model.addAttribute("volumen", volumen);
        model.addAttribute("cemento", cemento);
        model.addAttribute("arena", arena);
        model.addAttribute("piedra", piedra);
        return "contrapisos";
    }
    @GetMapping ("/contrapisos")
    public String mostrarContrapisos(){
        return "contrapisos";
    }

    @PostMapping ("/calcular-techos")
    public String calcularTechos(@RequestParam double largo, @RequestParam double ancho, @RequestParam double espesor, Model model){
        double area = techos.area(largo, ancho);
        double cemento = techos.cemento(area);
        double arena = techos.arena(area);
        double piedra = techos.piedra(area);
        double hierro8 = techos.hierro8(area);
        double hierro6 = techos.hierro6(area);
        model.addAttribute("area", area);
        model.addAttribute("cemento", cemento);
        model.addAttribute("arena", arena);
        model.addAttribute("piedra", piedra);
        model.addAttribute("hierro8", hierro8);
        model.addAttribute("hierro6", hierro6);
        return "techos";
    }
    @GetMapping ("/techos")
    public String mostrarTechos(){
        return "techos";
    }

    @PostMapping ("/calcular-pisos")
    public String calcularPisos(@RequestParam double ancho, @RequestParam double largo, Model model){
        double superficie = pisos.superficie(ancho, largo);
        double superficeR = pisos.superficieR(superficie);
        model.addAttribute("superficie", superficie);
        model.addAttribute("superficieR", superficeR);
        return "pisos";
    }
    @GetMapping ("/pisos")
    public String mostrarPisos(){
        return "pisos";
    }

    @PostMapping ("/calcular-pintura")
    public String calcularPintura(@RequestParam double superficie, Model model) {
    double litros = pintura.litros(superficie);
    model.addAttribute("litros", litros);
    return "pintura";
    }
    @GetMapping ("/pintura")
    public String mostrarPintura(){
        return "pintura";
    }
}
