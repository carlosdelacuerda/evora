import { createAction, props } from '@ngrx/store';
import { MaterialsListInterface } from 'src/app/interfaces/material.interface';

export const actionList = createAction(
    '[List] get list'
)

export const actionListSuccess = createAction(
    '[List] list success',
    props<MaterialsListInterface>
)

export const actionListError = createAction(
    '[List] list error',
    props<{error: any}>
)