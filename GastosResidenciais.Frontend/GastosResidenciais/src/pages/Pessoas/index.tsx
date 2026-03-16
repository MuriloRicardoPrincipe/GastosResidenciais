import { useEffect, useState, useMemo } from "react"
import { ConteinerPessoas, TransactionsContainer, TransactionsTable } from "./styles"
import { dateFormatter } from "../../utils/formatter"
import { Header } from "../../components/Header"
import { SearchForm } from "./components/SearchFormSchema"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { fetchPessoas } from "../../redux/pessoaReducer"
import * as Dialog from '@radix-ui/react-dialog';
import { PencilSimpleIcon, PlusIcon, TrashIcon } from "@phosphor-icons/react"
import { NewTransactionButton } from "./components/CriaPessoaModal/styles"
import { CriaPessoaModal } from "./components/CriaPessoaModal"
import { EditPessoaModal } from "./components/EdicaoPessoa"
import { DeletePessoaDialog } from "./components/ExclusaoPessoa"
import type { Pessoa } from "../../interface/Pessoa"

export function Pessoas() {

  const dispatch = useAppDispatch()

  const { pessoas, status } = useAppSelector((state) => state.pessoa)
  const [query, setQuery] = useState("")
  const [editingPessoa, setEditingPessoa] = useState<Pessoa | null>(null)

  const [open, setOpen] = useState(false)

  const pessoasFiltradas = useMemo(() => {
    return pessoas.filter((pessoa) =>
      pessoa.nome.toLowerCase().includes(query.toLowerCase())
    )
  }, [pessoas, query])

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPessoas())
    }
  }, [status, dispatch])

  return (
    <div>
      <Header />
      <TransactionsContainer>
        <ConteinerPessoas>
          <SearchForm onSearch={setQuery} />
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <NewTransactionButton><PlusIcon size={20} />Cadastrar</NewTransactionButton>
            </Dialog.Trigger>
            <CriaPessoaModal closeModal={() => setOpen(false)} />
          </Dialog.Root>
        </ConteinerPessoas>
        <TransactionsTable>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Idade</th>
              <th>Data Criação</th>
              <th>Editar</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {pessoasFiltradas.map((pessoa) => {
              return (
                <tr key={pessoa.id}>
                  <td width="33%">{pessoa.nome}</td>
                  <td>{pessoa.idade}</td>

                  <td>
                    {dateFormatter.format(
                      new Date(pessoa.dataCriacao)
                    )}
                  </td>

                  <td>
                    <PencilSimpleIcon
                      size={32}
                      style={{ cursor: "pointer" }}
                      onClick={() => setEditingPessoa(pessoa)}
                    />
                  </td>

                  <td>
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <TrashIcon size={32} style={{ cursor: "pointer" }} />
                      </Dialog.Trigger>
                      <DeletePessoaDialog
                        id={pessoa.id}
                        nome={pessoa.nome}
                        closeModal={() => { }}
                      />
                    </Dialog.Root>
                  </td>
                </tr>
              )
            })}
          </tbody>
          <Dialog.Root
            open={!!editingPessoa}
            onOpenChange={(open) => {
              if (!open) setEditingPessoa(null)
            }}
          >
            {editingPessoa && (
              <EditPessoaModal
                pessoa={editingPessoa}
                closeModal={() => setEditingPessoa(null)}
              />
            )}
          </Dialog.Root>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}