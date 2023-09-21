import { createAction, props } from '@ngrx/store';

export const actionNavigate = createAction(
    '[Nav] change material detail',
    props<{rowIndex: number}>()
)

export const actionOpen = createAction(
    '[Nav] open modal',
    props<{open:boolean}>()
)
