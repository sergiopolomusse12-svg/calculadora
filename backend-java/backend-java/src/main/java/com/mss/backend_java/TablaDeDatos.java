package com.mss.backend_java;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.boot.CommandLineRunner;
@Component
public class TablaDeDatos implements CommandLineRunner {
    private final JdbcTemplate jdbcTemplate;
    public void crearTabla(){
        jdbcTemplate.execute("""
                CREATE TABLE IF NOT EXISTS usuarios (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    usuario TEXT NOT NULL UNIQUE,
                    contrasena TEXT NOT NULL
                )
            """);
    }
    public TablaDeDatos(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    @Override
    public void run(String... args){
        crearTabla();
    }
}
