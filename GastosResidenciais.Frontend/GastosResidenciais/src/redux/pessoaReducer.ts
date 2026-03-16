import type { CreatePessoaArgs, Pessoa, UpdatePessoaArgs } from "../interface/Pessoa";
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { api as http } from '../lib/axios'; 

interface PessoaState {
    pessoas: Pessoa[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// Ação Assíncrona para Cadastro
export const createPessoa = createAsyncThunk<
    Pessoa,
    CreatePessoaArgs,
    { rejectValue: string }
>('pessoas/createPessoa', async (data, { rejectWithValue }) => {
    const apiPayload = {
        Nome: data.nome,
        Idade: data.idade
    };
    try {
        // 2. CHAMA A API: Usando post 
        // O ID é passado na URL: /Pessoa
        const response = await http.post<Pessoa>('/Pessoa', apiPayload);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Falha na submissão.');
    }
});

export const updatePessoa = createAsyncThunk<
    Pessoa,            
    UpdatePessoaArgs,  
    { rejectValue: string }
>('pessoas/updatePessoa', async ({ id, data }, { rejectWithValue }) => {

    const apiPayload = {
        Nome: data.nome,
        Idade: data.idade
    };

    try {
        // 2. CHAMA A API: Usando PUT (ou PATCH, dependendo do seu endpoint)
        // O ID é passado na URL: /Pessoa/{id}
        const response = await http.put<Pessoa>(`/Pessoa/${id}`, apiPayload);

        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Falha ao atualizar pessoa.');
    }
});

export const fetchPessoas = createAsyncThunk(
      'pessoas/fetchPessoas', 
    async () => {
        
        const response = await http.get<Pessoa[]>('/Pessoa'); 
        return response.data;
    }
);

export const deletePessoa = createAsyncThunk(
    'pessoas/deletePessoa',
    async (pessoaId: string) => {
        await http.delete(`/Pessoa/${pessoaId}`); // Sua requisição DELETE
        return pessoaId; // Retorna o ID que foi deletado
    }
);

const initialState: PessoaState = {
    pessoas: [],
    status: 'idle',
    error: null,
};

const pessoaSlice = createSlice({
    name: 'pessoas',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPessoa.pending, (state) => { /* ... */ })
            .addCase(createPessoa.fulfilled, (state, action: PayloadAction<Pessoa>) => {
                state.status = 'succeeded';
                state.pessoas.push(action.payload);
            })
            .addCase(createPessoa.rejected, (state, action) => { /* ... */ })

            .addCase(updatePessoa.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updatePessoa.fulfilled, (state, action: PayloadAction<Pessoa>) => {
                state.status = 'succeeded';

                const index = state.pessoas.findIndex(c => c.id === action.payload.id);
                if (index !== -1) {
                    state.pessoas[index] = action.payload;
                }
                state.error = null;
            })
            .addCase(updatePessoa.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Não foi possível atualizar.';
            })
            .addCase(fetchPessoas.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.pessoas = action.payload;
            })
            .addCase(deletePessoa.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deletePessoa.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Remove o cliente deletado do array do estado
                state.pessoas = state.pessoas.filter(c => c.id !== action.payload);
            })
            .addCase(deletePessoa.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Falha ao deletar Pessoa.';
            });
    },
});

export default pessoaSlice.reducer;