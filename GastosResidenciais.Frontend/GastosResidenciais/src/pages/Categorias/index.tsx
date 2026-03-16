import { useEffect, useState, useMemo } from "react"
import { ConteinerCategorias, TransactionsContainer, TransactionsTable } from "./styles"
import { dateFormatter } from "../../utils/formatter"
import { Header } from "../../components/Header"
import { SearchForm } from "./components/SearchFormSchema"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { fetchCategorias } from "../../redux/categoriaReducer"
import * as Dialog from '@radix-ui/react-dialog';
import { PencilSimpleIcon, PlusIcon, TrashIcon } from "@phosphor-icons/react"
import { NewTransactionButton } from "./components/CriaCategoriaModal/styles"
import { CriaCategoriaModal } from "./components/CriaCategoriaModal"
import { EditCategoriaModal } from "./components/EdicaoCategoria"
import { DeleteCategoriaDialog } from "./components/ExclusaoCategoria"
import { TipoFinalidadeLabel } from "../../interface/TipoFinalidade"
import type { Categoria } from "../../interface/Categoria"

export function Categorias() {

  const dispatch = useAppDispatch()

  const { categorias, status } = useAppSelector((state) => state.Categoria)
  const [query, setQuery] = useState("")
    const [editingCategoria, setEditingCategoria] = useState<Categoria | null>(null)

  const [open, setOpen] = useState(false)

  const CategoriasFiltradas = useMemo(() => {
    return categorias.filter((Categoria) =>
      Categoria.descricao.toLowerCase().includes(query.toLowerCase())
    )
  }, [categorias, query])

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategorias())
    }
  }, [status, dispatch])

  return (
    <div>
      <Header />
      <TransactionsContainer>
        <ConteinerCategorias>
          <SearchForm onSearch={setQuery} />
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <NewTransactionButton><PlusIcon size={20} />Cadastrar</NewTransactionButton>
            </Dialog.Trigger>
            <CriaCategoriaModal closeModal={() => setOpen(false)} />
          </Dialog.Root>
        </ConteinerCategorias>
        <TransactionsTable>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Finalidade</th>
              <th>Data Criação</th>
              <th>Editar</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {CategoriasFiltradas.map((Categoria) => {
              return (
                <tr key={Categoria.id}>
                  <td width="33%">{Categoria.descricao}</td>
                  <td>{TipoFinalidadeLabel[Categoria.tipoFinalidade]}</td>
                  <td>
                    {dateFormatter.format(
                      new Date(Categoria.dataCriacao)
                    )}
                  </td>
                  <td>
                    <PencilSimpleIcon
                      size={32}
                      style={{ cursor: "pointer" }}
                      onClick={() => setEditingCategoria(Categoria)}
                    />
                  </td>
                  <td>
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <TrashIcon size={32} style={{cursor:"pointer"}}/>
                      </Dialog.Trigger>
                      <DeleteCategoriaDialog
                        id={Categoria.id}
                        nome={Categoria.descricao}
                        closeModal={() => { }}
                      />
                    </Dialog.Root>
                  </td>
                </tr>
              )
            })}
          </tbody>
          <Dialog.Root
            open={!!editingCategoria}
            onOpenChange={(open) => {
              if (!open) setEditingCategoria(null)
            }}
          >
            {editingCategoria && (
              <EditCategoriaModal
                Categoria={editingCategoria}
                closeModal={() => setEditingCategoria(null)}
              />
            )}
          </Dialog.Root>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}