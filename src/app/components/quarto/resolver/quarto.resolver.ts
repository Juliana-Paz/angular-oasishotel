import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Municipio } from "../../../models/municipio.model";
import { inject } from "@angular/core";
import { Quarto } from "../../../models/quarto.model";
import { QuartoService } from "../../../services/quarto.service";


export const quartoResolver: ResolveFn<Quarto> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(QuartoService).findById(route.paramMap.get('id')!);
    }