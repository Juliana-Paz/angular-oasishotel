import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Amenidade } from '../models/amenidade.model';
import { Quarto } from '../models/quarto.model';
import { TipoQuarto } from '../models/tipo-quarto.model';

@Injectable({
  providedIn: 'root'
})
export class QuartoService {
  private apiUrl = 'http://localhost:8080/quartos';

  constructor(private http: HttpClient) { }

  getAll(page: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any>(this.apiUrl, { params });
  }

  findById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  create(quarto: Quarto): Observable<any> {
    const request = {
      nome: quarto.nome,
      valor: quarto.valor,
      descricao: quarto.descricao,
      isDisponivel: quarto.isDisponivel,
      tipoQuarto: quarto.tipoQuarto,
      amenidades: quarto.amenidades
    };

    return this.http.post<Quarto>(this.apiUrl, request);
  }

  update(quarto: Quarto): Observable<any> {
    const request = {
      nome: quarto.nome,
      valor: quarto.valor,
      descricao: quarto.descricao,
      isDisponivel: quarto.isDisponivel,
      tipoQuarto: quarto.tipoQuarto,
      amenidades: quarto.amenidades
    };

    return this.http.put<Quarto>(`${this.apiUrl}/${quarto.id}`, request);
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
