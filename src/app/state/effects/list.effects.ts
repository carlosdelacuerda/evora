import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, first, map, mergeMap, of } from "rxjs";
import { ListService } from "src/app/services/list.service";

@Injectable()
export class ListEffects {

    constructor(
        private actions$: Actions,
        private listService: ListService
    ){}

    getMaterials$ = createEffect(() => this.actions$.pipe(
        ofType('[List] get list'),
        mergeMap(() => this.listService.getAllMaterials()
            .pipe(
                first(),
                map((materials) => ({type: '[List] list success', materials })),
                catchError((error) => of({ type: '[List] list error', error}))
            ))
        )
    )


}