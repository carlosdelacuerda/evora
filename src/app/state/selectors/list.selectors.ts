import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { MaterialsListInterface, reducerListInterface } from "src/app/interfaces/material.interface";

export const selectListFeature = (state: AppState) => state.materials;

export const selectListSuccess:any = createSelector(
    selectListFeature,
    (state: reducerListInterface) => state
)

export const selectListError:any = createSelector(
    selectListFeature,
    (error) => error
)

