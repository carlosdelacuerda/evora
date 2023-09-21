import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { ReducerNavigateInterface } from "src/app/interfaces/navigate.interface";

export const selectNavigateFeature = (state: AppState) => state.navigate;

export const selectNavigate:any = createSelector(
    selectNavigateFeature,
    (state: ReducerNavigateInterface) => state.rowIndex
)

export const selectOpen:any = createSelector(
    selectNavigateFeature,
    (state: ReducerNavigateInterface) => state.open
)

