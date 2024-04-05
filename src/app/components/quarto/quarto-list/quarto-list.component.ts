import { Component } from '@angular/core';
import { Quarto } from '../../../models/quarto.model';
import { QuartoService } from '../../../services/quarto.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-quarto-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatToolbarModule, MatIconModule, MatButtonModule, RouterModule, MatPaginatorModule],
  templateUrl: './quarto-list.component.html',
  styleUrl: './quarto-list.component.css'
})
export class QuartoListComponent {
  displayedColumns: string[] = ['id', 'nome', 'descricao', 'valor', 'isDisponivel', 'tipoQuarto', 'amenidades', 'acoes'];
  quartos: Quarto[] = [];
  page = 0;
  pageSize = 8;
  totalQuartos: number = 0;

  constructor(
    private quartoService: QuartoService
  ) { }

  ngOnInit(): void {
    this.loadQuartos();
  }

  loadQuartos() {
    this.quartoService.getAll(this.page, this.pageSize).subscribe((res) => {
      this.quartos = res;
    }, (err) => {
      console.log(err);
    });
  }

  getNumberOfQuartos() {
    this.quartoService.count().subscribe((count) => {
      this.totalQuartos = count;
    }, (err) => {
      console.log(err);
    });
  }

  handlePage(event: PageEvent) {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadQuartos();
  }

  deleteQuarto(id: number): void {
    this.quartoService.delete(id).subscribe(() => {
      this.loadQuartos();
      this.getNumberOfQuartos();
    }, (err) => {
      console.log(err);
    }
    );
  }
}