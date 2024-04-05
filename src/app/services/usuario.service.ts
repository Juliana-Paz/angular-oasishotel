import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Perfil } from '../models/perfil.model';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl: string = ' http://localhost:8080/api/usuarios'

  constructor(private http: HttpClient) { }

  getAll(page: number, pageSize: number): Observable<any> {
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString()
    }

    return this.http.get<any>(`${this.apiUrl}`, { params })
  }

  findById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  create(usuario: Usuario): Observable<any> {
    let request = {
      nome: usuario.nome,
      sobrenome: usuario.sobrenome,
      senha: usuario.senha,
      email: usuario.email,
      dataNascimento: usuario.dataNascimento,
      endereco: usuario.endereco,
      cpf: usuario.cpf,
      contatos: usuario.contatos,
      perfilId: usuario.perfil.id
    };

    return this.http.post<Usuario>(this.apiUrl, request);
  }

  getPerfis(): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(`${this.apiUrl}/perfis`);
  }

  update(usuario: Usuario): Observable<Usuario> {
    let request = {
      nome: usuario.nome,
      sobrenome: usuario.sobrenome,
      senha: usuario.senha,
      email: usuario.email,
      dataNascimento: usuario.dataNascimento,
      endereco: usuario.endereco,
      cpf: usuario.cpf,
      contatos: usuario.contatos,
      perfilId: usuario.perfil.id
    };

    return this.http.put<Usuario>(`${this.apiUrl}/${usuario.id}`, request);
  }

}