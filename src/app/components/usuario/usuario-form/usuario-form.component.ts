import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Perfil } from '../../../models/perfil.model';
import { Usuario } from '../../../models/usuario.model';
import { Contato } from '../../../models/contato.model';
import moment from 'moment';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
    RouterModule, MatSelectModule
  ],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent implements OnInit {
  formGroup!: FormGroup;
  perfis: Perfil[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPerfis();

    const usuario: Usuario = this.activatedRoute.snapshot.data['usuario'];
    this.carregarFormulario(usuario);
  }

  carregarFormulario(usuario: Usuario | null): void {
    const perfil = this.perfis.find(p => p.id === (usuario?.perfil?.id) || null);

    this.formGroup = this.formBuilder.group({
      id: [usuario && usuario.id ? usuario.id : null],
      nome: [usuario && usuario.nome ? usuario.nome : '', Validators.required],
      sobrenome: [usuario && usuario.sobrenome ? usuario.sobrenome : '', Validators.required],
      senha: [usuario && usuario.senha ? usuario.senha : '', Validators.required],
      email: [usuario && usuario.email ? usuario.email : '', Validators.required],
      dataNascimento: [usuario && usuario.dataNascimento ? usuario.dataNascimento : '', Validators.required],
      endereco: [usuario && usuario.endereco ? usuario.endereco : '', Validators.required],
      cpf: [usuario && usuario.cpf ? usuario.cpf : '', Validators.required],
      contatos: this.formBuilder.array([]),
      perfil: [perfil]
    });
  }

  get contatos(): FormArray {
    return this.formGroup.get('contatos') as FormArray;
  }

  addContato(telefone: string = '') {
    this.contatos.push(this.formBuilder.group({
      telefone: [telefone]
    }));
  }

  getPerfis(): void {
    this.usuarioService.getPerfis().subscribe((res) => {
      this.perfis = res;
    })
  }

  onSubmit() {
    console.log(this.formGroup.value);

    if (this.formGroup.valid) {
      const usuario = this.formGroup.value;

      usuario.dataNascimento = moment(usuario.dataNascimento).format('YYYY-MM-DD');

      if (usuario.id) {
        this.usuarioService.update(usuario).subscribe((res) => {
          this.router.navigateByUrl('/usuarios/list');
        }, (err) => {
          console.log('Erro ao Atualizar: ' + JSON.stringify(err));
        }
        );
      } else {
        this.usuarioService.create(usuario).subscribe((res) => {
          this.router.navigateByUrl('/usuarios/list');
        }, (err) => {
          console.log('Erro ao Incluir: ' + JSON.stringify(err));
        });
      }
    }
  }
}