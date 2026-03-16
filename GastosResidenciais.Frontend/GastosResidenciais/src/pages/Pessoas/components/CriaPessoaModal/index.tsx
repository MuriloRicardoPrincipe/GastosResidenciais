import * as Dialog from '@radix-ui/react-dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from "@phosphor-icons/react"
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { CloseButton, Content, Overlay } from './styles'
import { useAppDispatch } from '../../../../redux/hooks'
import { createPessoa, fetchPessoas } from '../../../../redux/pessoaReducer'

const newPessoaFormSchema = z.object({
  nome: z.string(),
  idade: z.number().positive()
})

interface CriaPessoaModalProps {
  closeModal: () => void
}

type NewPessoaFormInputs = z.infer<typeof newPessoaFormSchema>

export function CriaPessoaModal({ closeModal }: CriaPessoaModalProps) {

const dispatch = useAppDispatch()


  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset
  } = useForm<NewPessoaFormInputs>({
    resolver: zodResolver(newPessoaFormSchema)
  })

async function handleCreatePessoa(data: NewPessoaFormInputs) {

  try {

    await dispatch(createPessoa({
      nome: data.nome,
      idade: data.idade
    })).unwrap()

    dispatch(fetchPessoas()) // refresh da lista

    reset()

    closeModal()
  } catch (error) {
    console.error("Erro ao criar pessoa", error)
  }

}

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Cadastrar Pessoa</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreatePessoa)}>

          <input
            type="text"
            placeholder="Nome"
            required
            {...register('nome')}
          />

          <input
            type="number"
            placeholder="Idade"
            required
            {...register('idade', { valueAsNumber: true })}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>

        </form>
      </Content>
    </Dialog.Portal>
  )
}