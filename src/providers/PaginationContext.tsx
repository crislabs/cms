'use client'
import React, { useContext } from 'react';
import { ConnectionArgs, ListInput } from '../interfaces/site';

type PaginationAction =
  | {type: 'connectionArgs', payload: ConnectionArgs}
  | {type: 'listInput', payload: ListInput}
  | {type: 'amount', payload: number}
  // | {type: 'togglePagination', payload: ConnectionArgs}

export const paginationReducer = (state: PaginationState, action: PaginationAction):PaginationState => {
  switch (action.type) {
    case 'connectionArgs':
        return {
          ...state,
          connectionArgs:  action.payload
        }
  
    case 'listInput':
        return {
          ...state,
          listInput:  action.payload
        }
  
    default:
      return state;
  }
}



type SeachContextProps = {
  paginationState: PaginationState
  togglePagination: (connectionArgs: ConnectionArgs) => void
  toggleListInput: (listInput: ListInput) => void
}

export const PaginationContext = React.createContext<SeachContextProps>({} as SeachContextProps)


interface PaginationProvider{
  children: React.ReactNode
}
export interface PaginationState{
  connectionArgs: ConnectionArgs
  listInput: ListInput
  amount: number
}

const INITIAL_STATE:PaginationState = {
  connectionArgs: { before: null, after: null, first: 12,   last: null },
  listInput: { limit: 12, offset: 0},
  amount: 12
}

export const PaginationProvider = ({ children }: PaginationProvider) => {
  const [paginationState, dispatch] = React.useReducer(paginationReducer, INITIAL_STATE)
  const togglePagination = (connectionArgs: ConnectionArgs) => {
    dispatch({type: 'connectionArgs', payload: connectionArgs})
  }
  const toggleListInput = (listInput: ListInput) => {
    dispatch({type: 'listInput', payload: listInput})
  }
  return <PaginationContext.Provider value={{paginationState, togglePagination, toggleListInput}}>{children}</PaginationContext.Provider>;
};

export const usePagination = () => {
  const {paginationState, togglePagination} = useContext(PaginationContext)
  const {connectionArgs, amount} = paginationState
  return {
    connectionArgs, amount, togglePagination
  }
}