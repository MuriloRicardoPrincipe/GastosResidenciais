
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { api as http } from '../lib/axios';
import type { CreateTransacoesArgs, Transacoes, UpdateTransacoesArgs } from "../interface/Transacoes";
import type { TotaisPessoa } from '../interface/TotaisPessoa';
import type { TotaisCategoria } from '../interface/TotaisCategoria';

interface TransacoesState {
    transacoes: Transacoes[]
    totaisPessoa: TotaisPessoa[]
    totaisCategoria: TotaisCategoria[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

interface TransacoesState {
    transacoes: Transacoes[]
    totaisPessoa: TotaisPessoa[]
    totaisCategoria: TotaisCategoria[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}

// Ação Assíncrona para Cadastro
export const createTransacoes = createAsyncThunk<
    Transacoes,
    CreateTransacoesArgs,
    { rejectValue: string }
>('transacoes/createTransacoes', async (data, { rejectWithValue }) => {
    const apiPayload = {
        Descricao: data.descricao,
        Valor: data.valor,
        TipoFinalidade: data.tipoFinalidade,
        CategoriaId: data.categoriaId,
        PessoaId: data.pessoaId
    };
    try {
        // 2. CHAMA A API: Usando post 
        // O ID é passado na URL: /Transacoes
        const response = await http.post<Transacoes>('/Transacoes', apiPayload);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Falha na submissão.');
    }
});

export const updateTransacoes = createAsyncThunk<
    Transacoes,
    UpdateTransacoesArgs,
    { rejectValue: string }
>('transacoes/updateTransacoes', async ({ id, data }, { rejectWithValue }) => {

    const apiPayload = {
        Descricao: data.descricao,
        Valor: data.valor,
        TipoFinalidade: data.tipoFinalidade,
        CategoriaId: data.categoriaId,
        PessoaId: data.pessoaId
    };

    try {
        // 2. CHAMA A API: Usando PUT (ou PATCH, dependendo do seu endpoint)
        // O ID é passado na URL: /Transacoes/{id}
        const response = await http.put<Transacoes>(`/Transacoes/${id}`, apiPayload);

        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Falha ao atualizar transação.');
    }
});

export const fetchTransacoes = createAsyncThunk(
    'transacoes/fetchTransacoes',
    async () => {

        const response = await http.get<Transacoes[]>('/Transacoes');
        return response.data;
    }
);

export const deleteTransacao = createAsyncThunk(
    'transacoes/deleteTransacao',
    async (transacaoId: string) => {
        await http.delete(`/Transacoes/${transacaoId}`); // Sua requisição DELETE
        return transacaoId; // Retorna o ID que foi deletado
    }
);

export const fetchTotaisPessoa = createAsyncThunk(
    'transacoes/fetchTotaisPessoa',
    async (_, { rejectWithValue }) => {
        try {
            const response = await http.get('/transacoes/totais-pessoa')
            return response.data
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Erro ao carregar relatório de pessoas'
            )
        }
    }
)

export const fetchTotaisCategoria = createAsyncThunk(
    'transacoes/fetchTotaisCategoria',
    async (_, { rejectWithValue }) => {
        try {
            const response = await http.get('/transacoes/totais-categoria')
            return response.data
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Erro ao carregar relatório de categorias'
            )
        }
    }
)

const initialState: TransacoesState = {
    transacoes: [],
    totaisPessoa: [],
    totaisCategoria: [],
    status: 'idle',
    error: null,
}

const transacoesSlice = createSlice({
    name: 'transacoes',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTransacoes.fulfilled, (state, action) => {
                state.transacoes.push(action.payload)
                window.location.reload();

            })
            .addCase(createTransacoes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Não foi possível criar a transação.';
            })
            .addCase(updateTransacoes.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateTransacoes.fulfilled, (state, action: PayloadAction<Transacoes>) => {
                state.status = 'succeeded';

                const index = state.transacoes.findIndex(c => c.id === action.payload.id);
                if (index !== -1) {
                    state.transacoes[index] = action.payload;
                }
                state.error = null;
                window.location.reload();
            })
            .addCase(updateTransacoes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Não foi possível atualizar.';
            })
            .addCase(fetchTransacoes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.transacoes = action.payload;
            })
            .addCase(deleteTransacao.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteTransacao.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Remove a transação deletada do array do estado
                state.transacoes = state.transacoes.filter(c => c.id !== action.payload);
            })
            .addCase(deleteTransacao.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Falha ao deletar Transação.';
            })
            .addCase(fetchTotaisPessoa.fulfilled, (state, action) => {
                state.totaisPessoa = action.payload
            })

            .addCase(fetchTotaisCategoria.fulfilled, (state, action) => {
                state.totaisCategoria = action.payload
            });
    },
});

export default transacoesSlice.reducer;