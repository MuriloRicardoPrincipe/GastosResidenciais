import * as Dialog from '@radix-ui/react-dialog'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import type { Transacoes } from '../../../../interface/Transacoes'
import { CloseButton, Content, Overlay } from './styles'
import { X } from '@phosphor-icons/react'
import { fetchTransacoes, updateTransacoes } from '../../../../redux/transacoesReducer'
import { CurrencyInput } from 'react-currency-input-field'
import { parseCurrency } from '../../../../utils/formatter'

const newTransacoesFormSchema = z.object({
  descricao: z.string().min(1),
  valor: z.string().min(1, "Informe o valor"),
  categoriaId: z.string().min(1, "Selecione categoria"),
  pessoaId: z.string().min(1, "Selecione pessoa")
})

type FormData = z.infer<typeof newTransacoesFormSchema>

interface Props {
  Transacoes: Transacoes
  closeModal: () => void
}

export function EditTransacoesModal({ Transacoes, closeModal }: Props) {

  const dispatch = useAppDispatch()
  const { categorias } = useAppSelector((state) => state.Categoria)
  const { pessoas } = useAppSelector((state) => state.pessoa)

  const { register, handleSubmit, control, formState: { isSubmitting } } =
    useForm<FormData>({
      resolver: zodResolver(newTransacoesFormSchema)
    })

  async function handleUpdate(data: FormData) {

    const categoria = categorias.find(
      c => c.id === data.categoriaId
    )

    if (!categoria) {
      console.error("Categoria não encontrada")
      return
    }

    await dispatch(updateTransacoes({

      id: Transacoes.id,
      data: {
        ...data,
        valor: parseCurrency(data.valor),
        tipoFinalidade: categoria.tipoFinalidade
      }
    })).unwrap()

    dispatch(fetchTransacoes())

    closeModal()
  }
  return (
    <Dialog.Portal>
      <Overlay />
      <Dialog.Overlay />

      <Content>
        <Dialog.Title>Editar Transacoes</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleUpdate)}>

          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('descricao')}
          />

          <Controller
            name="valor"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <CurrencyInput
                placeholder="Valor"
                prefix="R$ "
                decimalSeparator=","
                groupSeparator="."
                decimalsLimit={2}
                value={field.value}
                onValueChange={(value) => field.onChange(value ?? "")}
              />
            )}
          />
          <select {...register('categoriaId')}>
            <option value="">Selecione categoria</option>

            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.descricao}
              </option>
            ))}
          </select>
          <select {...register('pessoaId')}>
            <option value="">Selecione pessoa</option>

            {pessoas.map((pessoa) => (
              <option key={pessoa.id} value={pessoa.id}>
                {pessoa.nome}
              </option>
            ))}
          </select>
          <button type="submit" disabled={isSubmitting}>
            Salvar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}