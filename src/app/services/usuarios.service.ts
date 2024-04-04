import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl : string = ' http://localhost:8080/api/usuarios'

  constructor(private http:HttpClient) { }

  getAll():Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`)
  }

}
