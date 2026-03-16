import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 2rem auto;
  padding: 0 1.5rem;
`;

export const Title = styled.h2`
  margin-bottom: 1.5rem;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${props => props.theme['gray-700']};
  border-radius: 6px;
  overflow: hidden;

  th {
    text-align: left;
    padding: 1rem;
    background: ${props => props.theme['gray-600']};
    color: ${props => props.theme['gray-300']};
  }

  td {
    padding: 1rem;
    border-top: 1px solid ${props => props.theme['gray-600']};
  }
`;

export const Receita = styled.span`
  color: ${props => props.theme['green-300']};
`;

export const Despesa = styled.span`
  color: ${props => props.theme['red-300']};
`;

export const Saldo = styled.span<{ positivo: boolean }>`
  color: ${props =>
    props.positivo
      ? props.theme['green-300']
      : props.theme['red-300']};
`;

export const TotalRow = styled.tr`
  font-weight: bold;
  background: ${props => props.theme['gray-600']};
`;