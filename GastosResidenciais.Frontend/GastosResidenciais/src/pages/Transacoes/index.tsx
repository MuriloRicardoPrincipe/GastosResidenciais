import { useEffect, useState, useMemo } from "react"
import { ConteinerTransacoes, TransactionsContainer, TransactionsTable } from "./styles"
import { dateFormatter, priceFormatter } from "../../utils/formatter"
import { Header } from "../../components/Header"
import { SearchForm } from "./components/SearchFormSchema"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { fetchTransacoes } from "../../redux/transacoesReducer"
import * as Dialog from '@radix-ui/react-dialog';
import { PencilSimpleIcon, PlusIcon, TrashIcon } from "@phosphor-icons/react"
import { NewTransactionButton } from "./components/CriaTransacoesModal/styles"
import { CriaTransacoesModal } from "./components/CriaTransacoesModal"
import { EditTransacoesModal } from "./components/EdicaoPessoa"
import { DeleteTransacoesDialog } from "./components/ExclusaoPessoa"
import { TipoFinalidadeLabel } from "../../interface/TipoFinalidade"
import { fetchCategorias } from "../../redux/categoriaReducer"
import { fetchPessoas } from "../../redux/pessoaReducer"
import type { Transacoes } from "../../interface/Transacoes"

export function Transactions() {

  const dispatch = useAppDispatch()

  const { transacoes, status } = useAppSelector((state) => state.transacoes)
  const [query, setQuery] = useState("")
  const [editingTransacoes, setEditingTransacoes] = useState<Transacoes | null>(null)
  const { categorias } = useAppSelector((state) => state.Categoria)
  const { pessoas } = useAppSelector((state) => state.pessoa)
  const [open, setOpen] = useState(false)

  const TransacoessFiltradas = useMemo(() => {
    return transacoes.filter((transacao) =>
      transacao.descricao.toLowerCase().includes(query.toLowerCase())
    )
  }, [transacoes, query])

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTransacoes())
      dispatch(fetchTransacoes())
      dispatch(fetchCategorias())
      dispatch(fetchPessoas())
    }
  }, [status, dispatch])

  return (
    <div>
      <Header />
      <TransactionsContainer>
        <ConteinerTransacoes>
          <SearchForm onSearch={setQuery} />
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <NewTransactionButton><PlusIcon size={20} />Cadastrar</NewTransactionButton>
            </Dialog.Trigger>
            <CriaTransacoesModal closeModal={() => setOpen(false)} />
          </Dialog.Root>
        </ConteinerTransacoes>
        <TransactionsTable>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Finalidade</th>
              <th>Categoria</th>
              <th>Pessoa</th>
              <th>Editar</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {TransacoessFiltradas.map((Transacoes) => {
              return (
                <tr key={Transacoes.id}>
                  <td width="33%">{Transacoes.descricao}</td>
                  <td>{priceFormatter.format(Transacoes.valor)}</td>
                  <td>{TipoFinalidadeLabel[Transacoes.tipoFinalidade]}</td>
                  <td>
                    {categorias.find(c => c.id === Transacoes.categoriaId)?.descricao}
                  </td>

                  <td>
                    {pessoas.find(p => p.id === Transacoes.pessoaId)?.nome}
                  </td>
                  <td>
                    {dateFormatter.format(
                      new Date(Transacoes.dataCriacao)
                    )}
                  </td>
                  <td>
                    <PencilSimpleIcon
                      size={32}
                      style={{ cursor: "pointer" }}
                      onClick={() => setEditingTransacoes(Transacoes)}
                    />
                  </td>
                  <td>
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <TrashIcon size={32} style={{ cursor: "pointer" }} />
                      </Dialog.Trigger>
                      <DeleteTransacoesDialog
                        id={Transacoes.id}
                        nome={Transacoes.descricao}
                        closeModal={() => { }}
                      />
                    </Dialog.Root>
                  </td>
                </tr>
              )
            })}
          </tbody>
          <Dialog.Root
            open={!!editingTransacoes}
            onOpenChange={(open) => {
              if (!open) setEditingTransacoes(null)
            }}
          >
            {editingTransacoes && (
              <EditTransacoesModal
                Transacoes={editingTransacoes}
                closeModal={() => setEditingTransacoes(null)}
              />
            )}
          </Dialog.Root>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}