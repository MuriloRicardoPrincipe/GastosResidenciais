import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { api as http } from '../lib/axios'; 
import type { Categoria, CreateCategoriaArgs, UpdateCategoriaArgs } from "../interface/Categoria";

interface CategoriaState {
    categorias: Categoria[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// Ação Assíncrona para Cadastro
export const createCategoria = createAsyncThunk<
    Categoria,
    CreateCategoriaArgs,
    { rejectValue: string }
>('categoria/createCategoria', async (data, { rejectWithValue }) => {
    const apiPayload = {
        Descricao: data.descricao,
        TipoFinalidade: data.tipoFinalidade
    };
    try {
        // 2. CHAMA A API: Usando post 
        // O ID é passado na URL: /Categoria
        const response = await http.post<Categoria>('/Categoria', apiPayload);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Falha na submissão.');
    }
});

export const updateCategoria = createAsyncThunk<
    Categoria,            
    UpdateCategoriaArgs,  
    { rejectValue: string }
>('categoria/updateCategoria', async ({ id, data }, { rejectWithValue }) => {

    const apiPayload = {
        Descricao: data.descricao,
        TipoFinalidade: data.tipoFinalidade
    };

    try {
        // 2. CHAMA A API: Usando PUT (ou PATCH, dependendo do seu endpoint)
        // O ID é passado na URL: /Categoria/{id}
        const response = await http.put<Categoria>(`/Categoria/${id}`, apiPayload);

        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Falha ao atualizar categoria.');
    }
});

export const fetchCategorias = createAsyncThunk(
      'categoria/fetchCategorias', 
    async () => {
        
        const response = await http.get<Categoria[]>('/Categoria'); 
        return response.data;
    }
);

export const deleteCategoria = createAsyncThunk(
    'categoria/deleteCategoria',
    async (categoriaId: string) => {
        await http.delete(`/Categoria/${categoriaId}`); // Sua requisição DELETE
        return categoriaId; // Retorna o ID que foi deletado
    }
);

const initialState: CategoriaState = {
    categorias: [],
    status: 'idle',
    error: null,
};

const categoriaSlice = createSlice({
    name: 'categorias',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCategoria.pending, (state) => { /* ... */ })
            .addCase(createCategoria.fulfilled, (state, action: PayloadAction<Categoria>) => {
                state.status = 'succeeded';
                state.categorias.push(action.payload);
            })
            .addCase(createCategoria.rejected, (state, action) => { /* ... */ })

            .addCase(updateCategoria.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateCategoria.fulfilled, (state, action: PayloadAction<Categoria>) => {
                state.status = 'succeeded';

                const index = state.categorias.findIndex(c => c.id === action.payload.id);
                if (index !== -1) {
                    state.categorias[index] = action.payload;
                }
                state.error = null;
            })
            .addCase(updateCategoria.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Não foi possível atualizar.';
            })
            .addCase(fetchCategorias.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categorias = action.payload;
            })
            .addCase(deleteCategoria.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteCategoria.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Remove o cliente deletado do array do estado
                state.categorias = state.categorias.filter(c => c.id !== action.payload);
            })
            .addCase(deleteCategoria.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Falha ao deletar Categoria.';
            });
    },
});

export default categoriaSlice.reducer;