import type { TotaisCategoria } from "../../interface/TotaisCategoria";
import { Container, Despesa, Receita, Saldo, Table, Title, TotalRow } from "./styles";

interface Props {
  data: TotaisCategoria[];
}

export function TotaisCategoria({ data }: Props) {

  const totalReceitas = data.reduce((acc, c) => acc + c.receitas, 0);
  const totalDespesas = data.reduce((acc, c) => acc + c.despesas, 0);
  const saldoTotal = totalReceitas - totalDespesas;

  return (
    <Container>

      <Title>Totais por Categoria</Title>

      <Table>
        <thead>
          <tr>
            <th>Categoria</th>
            <th>Receitas</th>
            <th>Despesas</th>
            <th>Saldo</th>
          </tr>
        </thead>

        <tbody>
          {data.map(c => {

            const saldo = c.receitas - c.despesas;

            return (
              <tr key={c.categoria}>
                <td>{c.categoria}</td>
                <td>
                  <Receita>
                    R$ {c.receitas.toFixed(2)}
                  </Receita>
                </td>
                <td>
                  <Despesa>
                    R$ {c.despesas.toFixed(2)}
                  </Despesa>
                </td>
                <td>
                  <Saldo positivo={saldo >= 0}>
                    R$ {saldo.toFixed(2)}
                  </Saldo>
                </td>
              </tr>
            );
          })}
          <TotalRow>
            <td>Total Geral</td>
            <td>
              <Receita>
                R$ {totalReceitas.toFixed(2)}
              </Receita>
            </td>
            <td>
              <Despesa>
                R$ {totalDespesas.toFixed(2)}
              </Despesa>
            </td>
            <td>
              <Saldo positivo={saldoTotal >= 0}>
                R$ {saldoTotal.toFixed(2)}
              </Saldo>
            </td>
          </TotalRow>
        </tbody>
      </Table>
    </Container>
  );
}