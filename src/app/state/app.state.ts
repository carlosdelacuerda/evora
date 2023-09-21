import { ActionReducerMap } from "@ngrx/store";
import { ReducerListInterface } from "../interfaces/material.interface";
import { materialsReducer } from "./reducers/list.reducers";
import { ReducerNavigateInterface } from "../interfaces/navigate.interface";
import { navigateReducer } from "./reducers/navigate.reducers";

export interface AppState {
    materials: ReducerListInterface,
    navigate: ReducerNavigateInterface
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    materials: materialsReducer,
    navigate: navigateReducer
}