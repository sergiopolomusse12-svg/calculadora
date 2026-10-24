package com.mss.backend_java;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
@Component 
public class InicioSesion {
    private final JdbcTemplate jdbcTemplate;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    public InicioSesion(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    public boolean validar(String usuario, String contrasena){
        String sql = "SELECT contrasena FROM usuarios WHERE usuario = ?";
        var contrasenaHash = jdbcTemplate.query(sql, (rs, rowNum) -> rs.getString("contrasena"), usuario);
        if (contrasenaHash.isEmpty()){
            return false;
        }
        return passwordEncoder.matches(contrasena, contrasenaHash.get(0));
    }
}
