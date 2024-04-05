
import { Routes } from '@angular/router';
import { UsuarioFormComponent } from './components/usuario/usuario-form/usuario-form.component';
import { UsuarioListComponent } from './components/usuario/usuario-list/usuario-list.component';
import { usuarioResolver } from './components/usuario/resolver/usuario-resolver';

export const routes: Routes = [
    { path: 'registro', component: UsuarioFormComponent },
    { path: 'usuarios/list', component: UsuarioListComponent },
    { path: 'usuarios/editar/:id', component: UsuarioFormComponent, resolve: {usuario: usuarioResolver}}
];
