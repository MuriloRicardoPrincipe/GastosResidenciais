import * as Dialog from '@radix-ui/react-dialog'
import { useAppDispatch } from '../../../../redux/hooks'
import { deleteTransacao } from '../../../../redux/transacoesReducer'
import { CloseButton, ConfirmButton, Content, DeleteButton, Overlay } from './styles'
import { X } from '@phosphor-icons/react'

interface Props {
  id: string
  nome: string
  closeModal: () => void
}

export function DeleteTransacoesDialog({ id, nome, closeModal }: Props) {

  const dispatch = useAppDispatch()

  async function handleDelete() {

    await dispatch(deleteTransacao(id)).unwrap()

    closeModal()
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Confirmar exclusão</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <form style={{ display: "flex", gap: 10 }}>

        <p>Deseja realmente excluir <strong>{nome}</strong>?</p>

          <div>
            <ConfirmButton onClick={handleDelete}>
              Confirmar
            </ConfirmButton>
            <DeleteButton onClick={closeModal}>
              Cancelar
            </DeleteButton>
          </div>
        </form>
      </Content>


    </Dialog.Portal>
  )
}