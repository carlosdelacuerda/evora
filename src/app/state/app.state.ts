import { ActionReducerMap } from "@ngrx/store";
import { MaterialsListInterface, reducerListInterface } from "../interfaces/material.interface";
import { materialsReducer } from "./reducers/list.reducers";

export interface AppState {
    materials: reducerListInterface
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    materials: materialsReducer
}