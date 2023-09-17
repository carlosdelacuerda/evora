import { ActionReducerMap } from "@ngrx/store";
import { ReducerListInterface } from "../interfaces/material.interface";
import { materialsReducer } from "./reducers/list.reducers";

export interface AppState {
    materials: ReducerListInterface
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    materials: materialsReducer
}