import { Contato } from "./contato.model";
import { Perfil } from "./perfil.model";

export class Usuario {
    nome!: string;
    sobrenome!: string;
    senha!: string;
    dataNascimento!: string;
    endereco!: string;
    cpf!: string;
    contatos!: Contato[];
    perfil!: Perfil;
}
