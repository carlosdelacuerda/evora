import { createAction, props } from '@ngrx/store';
import { MaterialInterface, MaterialsListInterface } from 'src/app/interfaces/material.interface';

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

export const actionStoreDBMaterials = createAction(
    '[List] Store the materials from DB',
    props<{material:MaterialInterface[]}>()
)

export const actionUpdateData = createAction(
    '[List] Update amount of materials',
    props<{ material:any, index:number }>()
)