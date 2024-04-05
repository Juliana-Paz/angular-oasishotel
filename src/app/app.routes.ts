
import { Routes } from '@angular/router';
import { UsuarioFormComponent } from './components/usuario/usuario-form/usuario-form.component';
import { UsuarioListComponent } from './components/usuario/usuario-list/usuario-list.component';
import { usuarioResolver } from './components/usuario/resolver/usuario-resolver';
import { QuartoFormComponent } from './components/quarto/quarto-form/quarto-form.component';
import { QuartoListComponent } from './components/quarto/quarto-list/quarto-list.component';
import { quartoResolver } from './components/quarto/resolver/quarto.resolver';

export const routes: Routes = [
    { path: 'usuarios/new', component: UsuarioFormComponent },
    { path: 'usuarios/list', component: UsuarioListComponent },
    { path: 'usuarios/edit/:id', component: UsuarioFormComponent, resolve: { usuario: usuarioResolver } },
    { path: 'quartos/new', component: QuartoFormComponent },
    { path: 'quartos/list', component: QuartoListComponent },
    { path: 'quartos/edit/:id', component: QuartoFormComponent, resolve: { quarto: quartoResolver } },
];