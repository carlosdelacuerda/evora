import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/navigate.actions';
import { ReducerNavigateInterface } from 'src/app/interfaces/navigate.interface';

  export const initialNavigateState: ReducerNavigateInterface = {
    type: '',
    rowIndex: 0,
    open: false
  };

  export const navigateReducer = createReducer (
    initialNavigateState,

    on(actions.actionNavigate, (state, navigate) => {
        return {...state, ...navigate}
    }),
    on(actions.actionOpen, (state, open) => {
      return {...state, ...open}
    })
  )