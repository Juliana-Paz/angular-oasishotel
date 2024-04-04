import { CommonModule } from '@angular/common';
import { UsuariosService } from './../../services/usuarios.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {

  usuarios:  any[] = [];

  constructor(private usuariosService:UsuariosService) {

  }
  
  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios() {
    this.usuariosService.getAll().subscribe((data) => { 
      this.usuarios = data;
      console.log('Listando usuarios: ', data);
    });
  }

}
