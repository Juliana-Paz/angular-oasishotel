import { Amenidade } from "./amenidade.model";
import { TipoQuarto } from "./tipo-quarto.model";

export class Quarto {
    id!: number;
    nome!: string;
    valor!: number;
    descricao!: string;
    isDisponivel!: boolean;
    tipoQuarto!: TipoQuarto[];
    amenidades!: Amenidade[];
}