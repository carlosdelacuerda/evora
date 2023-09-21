import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/list.actions';
import {  ReducerListInterface } from 'src/app/interfaces/material.interface';

  export const initialListState: ReducerListInterface = {
    type: '',
    materials: []
  };

  export const materialsReducer = createReducer (
    initialListState,

    on(actions.actionList, () => {
        return initialListState
    }),

    on(actions.actionListSuccess, (state, {...list}) => {
        return {...state, ...list}
    }),

    on(actions.actionListError, (state, error) => {
        return {...state, error}
    } ),

    on(actions.actionStoreDBMaterials, (state, {...list}) => {
      return {...state, materials:list.material, type:list.type}
    } ),

    on(actions.actionUpdateData, (state, {material, index}) => {
      let updated = [...state.materials]
      updated[index] = material
      return {...state, materials: updated}
    })
  )