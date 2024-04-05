import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Quarto } from '../../../models/quarto.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { QuartoService } from '../../../services/quarto.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-quarto-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
    RouterModule, MatSelectModule
  ],
  templateUrl: './quarto-form.component.html',
  styleUrl: './quarto-form.component.css'
})
export class QuartoFormComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private quartoService: QuartoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const quarto: Quarto = this.activatedRoute.snapshot.data['quarto'];
    this.init(quarto);
  }

  init(quarto: Quarto): void {
    this.formGroup = this.formBuilder.group({
      id: [quarto && quarto.id ? quarto.id : null],
      nome: [quarto && quarto.nome ? quarto.nome : '', Validators.required],
      valor: [quarto && quarto.valor ? quarto.valor : 0, Validators.required],
      descricao: [quarto && quarto.descricao ? quarto.descricao : '', Validators.required],
      tipoQuarto: this.formBuilder.array([]),
      amenidades: this.formBuilder.array([])
    });
  }

  get tipoQuarto(): FormArray {
    return this.formGroup.get('tipoQuarto') as FormArray;
  }
  
  addTipoQuarto(nome: string = '') {
    this.tipoQuarto.push(this.formBuilder.group({
      nome: [nome, Validators.required]
    }));
  }
  
  get amenidades(): FormArray {
    return this.formGroup.get('amenidades') as FormArray;
  }
  
  addAmenidade(nome: string = '') {
    this.amenidades.push(this.formBuilder.group({
      nome: [nome, Validators.required]
    }));
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const quarto = this.formGroup.value;

      if (quarto.id) {
        this.quartoService.update(quarto).subscribe((res) => {
          this.router.navigateByUrl('/quartos/list');
        }, (err) => {
          console.log('Erro ao Atualizar: ' + JSON.stringify(err));
        });
      } else {
        this.quartoService.create(quarto).subscribe((res) => {
          this.router.navigateByUrl('/quartos/list');
        }, (err) => {
          console.log('Erro ao Incluir: ' + JSON.stringify(err));
        });
      }
    }
  }
}