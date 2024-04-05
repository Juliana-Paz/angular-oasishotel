import { Contato } from "./contato.model";
import { Perfil } from "./perfil.model";

export class Usuario {
    id!: number;
    nome!: string;
    sobrenome!: string;
    senha!: string;
    email!: string;
    dataNascimento!: string;
    endereco!: string;
    cpf!: string;
    contatos!: Contato[];
    perfil!: Perfil;
}
