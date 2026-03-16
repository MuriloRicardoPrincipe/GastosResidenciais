import * as Dialog from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useAppDispatch } from '../../../../redux/hooks'
import { updateCategoria } from '../../../../redux/categoriaReducer'
import type { Categoria } from '../../../../interface/Categoria'
import { CloseButton, Content, Overlay } from './styles'
import { X } from '@phosphor-icons/react'
import { TipoFinalidadeApi } from '../../../../interface/TipoFinalidade'

const newCategoriaFormSchema = z.object({
  descricao: z.string(),
  tipoFinalidade: z.nativeEnum(TipoFinalidadeApi)
})


type FormData = z.infer<typeof newCategoriaFormSchema>

interface Props {
  Categoria: Categoria
  closeModal: () => void
}

export function EditCategoriaModal({ Categoria, closeModal }: Props) {

  const dispatch = useAppDispatch()

  const { register, handleSubmit,  formState: { isSubmitting }, reset } =
    useForm<FormData>({
      resolver: zodResolver(newCategoriaFormSchema),
      defaultValues: {
        descricao: Categoria.descricao,
        tipoFinalidade: Categoria.tipoFinalidade
      }
    })

  async function handleUpdate(data: FormData) {

    try {
      await dispatch(updateCategoria({
        id: Categoria.id,
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
        <Dialog.Title>Editar Categoria</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleUpdate)}>

          <input
            {...register("descricao")}
            placeholder="Descrição"
          />


          <select
            {...register('tipoFinalidade', { valueAsNumber: true })}
          >
            <option value="">Selecione...</option>
            <option value={TipoFinalidadeApi.DESPESA}>Despesa</option>
            <option value={TipoFinalidadeApi.RECEITA}>Receita</option>
          </select>

          <button type="submit" disabled={isSubmitting}>
            Salvar
          </button>

        </form>

      </Content>
    </Dialog.Portal>
  )
}