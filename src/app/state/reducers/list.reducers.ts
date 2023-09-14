import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/list.actions';
import {  reducerListInterface } from 'src/app/interfaces/material.interface';

  export const initialListState: reducerListInterface = {
    type: '',
    materials: {
      d : {
        FrontId: "",
        NotificationNo: "",
        PartSet: {
          results: []
        }
      }
    }
  };

  export const materialsReducer = createReducer (
    initialListState,

    on(actions.actionList, () => {
        return initialListState
    }),

    on(actions.actionListSuccess, (state, list) => {
        return {...state, ...list}
    }),

    on(actions.actionListError, (state, error) => {
        return {...state, error}
    } )
  )