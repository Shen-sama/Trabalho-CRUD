import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { NgFor, NgIf } from '@angular/common';
import { provideNgxMask, NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { CadastroService } from './cadastro.service';
import { Usuario } from './usuario.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [provideNgxMask(), CadastroService],
  imports: [CommonModule, FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatCardModule, MatIconModule, MatDividerModule, 
    MatExpansionModule, NgFor, NgIf, NgxMaskDirective, MatSelectModule, HttpClientModule],
  templateUrl: './cadastro.component.html',
})
export class CadastroComponent {
  usuario: Usuario = {
    nome: '',
    email: '',
    senha: '',
    enderecos: [
      { rua: '', numero: '', complemento: '', cidade: '', estado: '', cep: '' }
    ],
    telefones: [
      { ddd: '', numero: '' }
    ]
  };

  usuarios: Usuario[] = [];

  modoEdicao = false;
  usuarioEditandoId?: number;

  estados: string[] = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
    'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
    'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  constructor(private cadastroService: CadastroService) {
    this.listarUsuarios();
  }

  adicionarEndereco() {
    this.usuario.enderecos.push({ rua: '', numero: '', complemento: '', cidade: '', estado: '', cep: '' });
  }

  removerEndereco(index: number) {
    this.usuario.enderecos.splice(index, 1);
  }

  adicionarTelefone() {
    this.usuario.telefones.push({ ddd: '', numero: '' });
  }

  removerTelefone(index: number) {
    this.usuario.telefones.splice(index, 1);
  }

  salvar() {
    this.cadastroService.salvar(this.usuario).subscribe({
      next: (res) => {
        alert('Usuário salvo com sucesso!');
        console.log(res);
        this.usuario = {
          nome: '',
          email: '',
          senha: '',
          enderecos: [{ rua: '', numero: '', complemento: '', cidade: '', estado: '', cep: '' }],
          telefones: [{ ddd: '', numero: '' }]
        };
        this.resetarFormulario();
        this.listarUsuarios();
      },
      error: (err) => {
        alert('Erro ao salvar o usuário. Verifique os dados e tente novamente.');
        console.error(err);
      }
    });
  }

  listarUsuarios() {
    this.cadastroService.listar().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
        console.log('Usuários encontrados:', usuarios);
        alert(`Foram encontrados ${usuarios.length} usuários.`);
      },
      error: (err) => {
        alert('Erro ao listar os usuários.');
        console.error(err);
      }
    });
  }

  buscarPorId(id: number) {
    this.cadastroService.buscarPorId(id).subscribe({
      next: (usuario) => {
        console.log('Usuário carregado:', usuario);

        if (!usuario.enderecos || usuario.enderecos.length === 0) {
          usuario.enderecos = [{ rua: '', numero: '', complemento: '', cidade: '', estado: '', cep: '' }];
        }

        if (!usuario.telefones || usuario.telefones.length === 0) {
          usuario.telefones = [{ ddd: '', numero: '' }];
        }
        
        this.usuario = usuario;
        this.usuarioEditandoId = id;
        this.modoEdicao = true;
      },
      error: (err) => {
        alert('Erro ao buscar o usuário.');
        console.error(err);
      }
    });
  }

  atualizarUsuario(id: number) {
    this.cadastroService.atualizar(id, this.usuario).subscribe({
      next: () => {
        alert('Usuário atualizado com sucesso!');
        this.resetarFormulario();
        this.modoEdicao = false;
        this.usuarioEditandoId = undefined;
        this.listarUsuarios();
      },
      error: (err) => {
        alert('Erro ao atualizar o usuário.');
        console.error(err);
      }
    });
  }

  deletarUsuario(id: number) {
    this.cadastroService.deletar(id).subscribe({
      next: () => {
        alert('Usuário deletado com sucesso!');
        this.resetarFormulario();
      },
      error: (err) => {
        alert('Erro ao deletar o usuário.');
        console.error(err);
      }
    });
  }

  resetarFormulario() {
    this.usuario = {
      nome: '',
      email: '',
      senha: '',
      enderecos: [{ rua: '', numero: '', complemento: '', cidade: '', estado: '', cep: '' }],
      telefones: [{ ddd: '', numero: '' }]
    };
    this.modoEdicao = false;
    this.usuarioEditandoId = undefined;
  }
}