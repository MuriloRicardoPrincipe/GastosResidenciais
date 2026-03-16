import type { TotaisPessoa } from "../../interface/TotaisPessoa";
import { Container, Title, Table, Receita, Despesa, Saldo, TotalRow } from "./styles";

interface Props {
  data: TotaisPessoa[];
}

export function TotaisPessoa({ data }: Props) {

  const totalReceitas = data.reduce((acc, p) => acc + p.receitas, 0);
  const totalDespesas = data.reduce((acc, p) => acc + p.despesas, 0);
  const saldoTotal = totalReceitas - totalDespesas;

  return (
    <Container>

      <Title>Totais por Pessoa</Title>

      <Table>
        <thead>
          <tr>
            <th>Pessoa</th>
            <th>Receitas</th>
            <th>Despesas</th>
            <th>Saldo</th>
          </tr>
        </thead>

        <tbody>
          {data.map(p => {

            const saldo = p.receitas - p.despesas;

            return (
              <tr key={p.pessoa}>
                <td>{p.pessoa}</td>

                <td>
                  <Receita>
                    R$ {p.receitas.toFixed(2)}
                  </Receita>
                </td>

                <td>
                  <Despesa>
                    R$ {p.despesas.toFixed(2)}
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