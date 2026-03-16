import * as Dialog from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useAppDispatch } from '../../../../redux/hooks'
import { updatePessoa } from '../../../../redux/pessoaReducer'
import type { Pessoa } from '../../../../interface/Pessoa'
import { CloseButton, Content, Overlay } from './styles'
import { X } from '@phosphor-icons/react'
import { useEffect } from 'react'

const schema = z.object({
  nome: z.string(),
  idade: z.number().positive()
})

type FormData = z.infer<typeof schema>

interface Props {
  pessoa: Pessoa
  closeModal: () => void
}

export function EditPessoaModal({ pessoa, closeModal }: Props) {

  const dispatch = useAppDispatch()

  const { register, handleSubmit, formState: { isSubmitting }, reset } =
    useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: {
        nome: pessoa.nome,
        idade: pessoa.idade
      }
    })
    
  useEffect(() => {
    reset({
      nome: pessoa.nome,
      idade: pessoa.idade
    })
  }, [pessoa, reset])
  async function handleUpdate(data: FormData) {

    try {
      await dispatch(updatePessoa({
        id: pessoa.id,
        data
      })).unwrap()
      reset()
      closeModal()
    } catch (error) {
      console.error("Erro ao criar Categoria", error)
    }
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Dialog.Overlay />

      <Content>
        <Dialog.Title>Editar Pessoa</Dialog.Title>
                <CloseButton>
                  <X size={24} />
                </CloseButton>

        <form onSubmit={handleSubmit(handleUpdate)}>

          <input
            {...register("nome")}
            placeholder="Nome"
          />

          <input
            type="number"
            {...register("idade", { valueAsNumber: true })}
            placeholder="Idade"
          />

          <button type="submit" disabled={isSubmitting}>
            Salvar
          </button>

        </form>

      </Content>
    </Dialog.Portal>
  )
}