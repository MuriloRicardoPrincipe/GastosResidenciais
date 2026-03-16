import * as Dialog from '@radix-ui/react-dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from "@phosphor-icons/react"
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { CloseButton, Content, Overlay } from './styles'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { createTransacoes, fetchTransacoes } from '../../../../redux/transacoesReducer'
import CurrencyInput from 'react-currency-input-field'
import { parseCurrency } from '../../../../utils/formatter'

const newTransacoesFormSchema = z.object({
  descricao: z.string().min(1),
  valor: z.string().min(1, "Informe o valor"),
  categoriaId: z.string().min(1, "Selecione categoria"),
  pessoaId: z.string().min(1, "Selecione pessoa")
})

interface CriaTransacoesModalProps {
  closeModal: () => void
}

type NewTransacoesFormInputs = z.infer<typeof newTransacoesFormSchema>

export function CriaTransacoesModal({ closeModal }: CriaTransacoesModalProps) {

  const dispatch = useAppDispatch()
  const { categorias } = useAppSelector((state) => state.Categoria)
  const { pessoas } = useAppSelector((state) => state.pessoa)

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset
  } = useForm<NewTransacoesFormInputs>({
    resolver: zodResolver(newTransacoesFormSchema)
  })

  async function handleCreateTransacoes(data: NewTransacoesFormInputs) {

    const valor = parseCurrency(data.valor)

    const categoria = categorias.find(c => c.id === data.categoriaId)

    if (!categoria) return

    await dispatch(createTransacoes({
      descricao: data.descricao,
      valor,
      categoriaId: data.categoriaId,
      pessoaId: data.pessoaId,
      tipoFinalidade: categoria.tipoFinalidade
    })).unwrap()

    dispatch(fetchTransacoes())

    reset()
    closeModal()
  }
  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Cadastrar Transacoes</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <form onSubmit={handleSubmit(handleCreateTransacoes)}>
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
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}