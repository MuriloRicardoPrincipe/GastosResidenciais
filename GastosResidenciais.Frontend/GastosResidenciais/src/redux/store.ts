import { configureStore } from '@reduxjs/toolkit';
import pessoaReducer from './pessoaReducer';
import categoriaReducer from './categoriaReducer';
import transacoesReducer from './transacoesReducer';

export const store = configureStore({
  reducer: {
    Categoria: categoriaReducer,
    pessoa: pessoaReducer,
    transacoes: transacoesReducer
  },
});

// Tipagem para facilitar o uso dos hooks (useAppDispatch, useAppSelector)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch