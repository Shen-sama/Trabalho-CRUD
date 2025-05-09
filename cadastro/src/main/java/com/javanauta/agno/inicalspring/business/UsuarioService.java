package com.javanauta.agno.inicalspring.business;


import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.javanauta.agno.inicalspring.infrastructure.entity.Usuario;
import com.javanauta.agno.inicalspring.infrastructure.exceptions.ConflictException;
import com.javanauta.agno.inicalspring.infrastructure.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public Usuario salvarUsuario(Usuario usuario){
        try {
            emailExiste(usuario.getEmail());
         return usuarioRepository.save(usuario);

        }catch (ConflictException e) {
            throw new ConflictException("Email já cadastrado" +  e.getCause());

        }
    }
    public void emailExiste(String email){
        try {
            boolean existe = verificaEmailExistente(email);
            if(existe){
                throw new ConflictException("Email já cadastrado" + email);
            }
        }catch (ConflictException e){
            throw new ConflictException("Email já cadastrado" + e.getCause());
        }
    }

    public boolean verificaEmailExistente(String email){
        return usuarioRepository.existsByEmail(email);
    }

    public List<Usuario> listar(){
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> buscarPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    public Optional<Usuario> atualizar(Long id, Usuario usuarioAtualizado) {
        return usuarioRepository.findById(id).map(usuario -> {
            usuario.setNome(usuarioAtualizado.getNome());
            usuario.setEmail(usuarioAtualizado.getEmail());

            usuario.getEnderecos().clear();
            usuario.getEnderecos().addAll(usuarioAtualizado.getEnderecos());

            usuario.getTelefones().clear();
            usuario.getTelefones().addAll(usuarioAtualizado.getTelefones());

            return usuarioRepository.save(usuario);
        });

    }
    public boolean deletar(Long id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return true;
        }
        return false;
    }

}
