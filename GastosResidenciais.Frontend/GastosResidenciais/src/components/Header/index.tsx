import { TotaisCategoria } from "../TotaisCategoria";
import { TotaisPessoa } from "../TotaisPessoa";
import { HeaderContainer, HeaderContent, HeaderLinks, StyledLink } from "./styles";
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { fetchTotaisPessoa, fetchTotaisCategoria } from "../../redux/transacoesReducer"



export function Header() {

const dispatch = useAppDispatch()

const { totaisPessoa, totaisCategoria, status } = useAppSelector(
  (state) => state.transacoes
)

useEffect(() => {
  if (status === "idle") {
    dispatch(fetchTotaisPessoa())
    dispatch(fetchTotaisCategoria())
  }
}, [status, dispatch])

  return (
    <HeaderContainer>
      <HeaderContent>
        <HeaderLinks>
          <StyledLink to="/pessoas">
            Pessoas
          </StyledLink>
          <StyledLink to="/categorias">
            Categorias
          </StyledLink>
          <StyledLink to="/">
            Transações
          </StyledLink>
        </HeaderLinks>
        <TotaisPessoa
          data={totaisPessoa}
        />
        <TotaisCategoria
          data={totaisCategoria}
        />
      </HeaderContent>
    </HeaderContainer>
  );
}