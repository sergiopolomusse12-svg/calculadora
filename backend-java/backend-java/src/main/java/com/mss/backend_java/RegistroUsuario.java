package com.mss.backend_java;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
@Component
public class RegistroUsuario {
    private final JdbcTemplate jdbcTemplate;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    public RegistroUsuario(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }
    public void registrarse(Registro registro){
         if (registro.getUsuario().isBlank() ||
            registro.getContrasena().isBlank() ||
            registro.getContrasenaConfirmada().isBlank()){
                throw new IllegalArgumentException("Todos los campos son obligatorios");
            }
         if (!registro.getContrasena().equals(registro.getContrasenaConfirmada())){
            throw new IllegalArgumentException("Las contraseñas no coinciden");
         }
         if (existeUsuario(registro.getUsuario())){
            throw new IllegalArgumentException("Este usuario ya existe");
         }
        String contrasenaHash = passwordEncoder.encode(registro.getContrasena());
        jdbcTemplate.update("INSERT INTO usuarios (usuario, contrasena) VALUES (?, ?)", registro.getUsuario(), contrasenaHash);
    }
    public boolean existeUsuario(String usuario){
        Integer cantidad = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM usuarios WHERE usuario = ?", Integer.class, usuario);
        return cantidad > 0;
    }
}
 