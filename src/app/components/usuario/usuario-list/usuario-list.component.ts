import { UsuarioService } from './../../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatToolbarModule, MatIconModule, MatButtonModule, RouterModule, MatPaginatorModule],
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.css'
})
export class UsuarioListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'sobrenome', 'senha', 'dataNascimento', 'endereco', 'cpf', 'contatos', 'perfil', 'acoes'];
  columnNames: any = {
    id: 'ID',
    nome: 'Nome',
    sobrenome: 'Sobrenome',
    senha: 'Senha',
    dataNascimento: 'Data de Nascimento',
    endereco: 'Endereço',
    cpf: 'CPF',
    contatos: 'Contatos',
    perfil: 'Perfil'
  };
  usuarios: Usuario[] = [];
  page = 0;
  pageSize = 8;
  totalUsuarios: number = 0;

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.usuarioService.getAll(this.page, this.pageSize).subscribe((res) => {
      this.usuarios = res;
    }, (err) => {
      console.log(err);
    })
  }

  loadUsuarios() {
    this.usuarioService.getAll(this.page, this.pageSize).subscribe((res) => {
      this.usuarios = res;
    }, (err) => {
      console.log(err);
    });
  }

  getNumberOfusuarios() {
    this.usuarioService.count().subscribe((count) => {
      this.totalUsuarios = count;
    }, (err) => {
      console.log(err);
    });
  }

  handlePage(event: PageEvent) {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadUsuarios();
  }

  deleteUsuario(id: number): void {
    this.usuarioService.delete(id).subscribe(() => {
      this.loadUsuarios();
      this.getNumberOfusuarios();
    }, (err) => {
      console.log(err);
    }
    );
  }
}