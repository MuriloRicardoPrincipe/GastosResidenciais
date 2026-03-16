import * as Dialog from '@radix-ui/react-dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from "@phosphor-icons/react"
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { CloseButton, Content, Overlay } from './styles'
import { useAppDispatch } from '../../../../redux/hooks'
import { createCategoria, fetchCategorias } from '../../../../redux/categoriaReducer'
import { TipoFinalidadeApi } from '../../../../interface/TipoFinalidade'

const newCategoriaFormSchema = z.object({
  descricao: z.string(),
  tipoFinalidade: z.nativeEnum(TipoFinalidadeApi)
})

interface CriaCategoriaModalProps {
  closeModal: () => void
}

type NewCategoriaFormInputs = z.infer<typeof newCategoriaFormSchema>

export function CriaCategoriaModal({ closeModal }: CriaCategoriaModalProps) {

const dispatch = useAppDispatch()


  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset
  } = useForm<NewCategoriaFormInputs>({
    resolver: zodResolver(newCategoriaFormSchema)
  })

async function handleCreateCategoria(data: NewCategoriaFormInputs) {

  try {

    await dispatch(createCategoria({
        descricao: data.descricao,
        tipoFinalidade: data.tipoFinalidade
    })).unwrap()

    dispatch(fetchCategorias()) // refresh da lista

    reset()

    closeModal()
  } catch (error) {
    console.error("Erro ao criar Categoria", error)
  }

}

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Cadastrar Categoria</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateCategoria)}>

          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('descricao')}
          />

          <select
            {...register('tipoFinalidade', { valueAsNumber: true })}
          >
            <option value="">Selecione...</option>
            <option value={TipoFinalidadeApi.DESPESA}>Despesa</option>
            <option value={TipoFinalidadeApi.RECEITA}>Receita</option>
          </select>

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>

        </form>
      </Content>
    </Dialog.Portal>
  )
}