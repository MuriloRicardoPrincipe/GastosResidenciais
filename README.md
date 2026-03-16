# Sistema de Gestão de Transações

## Visão Geral

O sistema permite o gerenciamento de **pessoas, categorias e transações financeiras**, além da visualização de **totais de receitas, despesas e saldo** por pessoa e por categoria.

A aplicação é dividida em duas camadas principais:

- **Frontend:** aplicação web desenvolvida com React e TypeScript
- **Backend:** API REST desenvolvida com .NET 9 responsável pelas regras de negócio e persistência de dados

---

# Como Baixar e Executar o Projeto

## 1. Clonar o Repositório

Primeiro, faça o clone do projeto utilizando o Git:

```bash
git clone https://github.com/MuriloRicardoPrincipe/GastosResidenciais


## 2. Configurando backend



## 3. Configurando frontend
---

# Cadastro de Pessoas

O cadastro de pessoas permite gerenciar indivíduos que podem possuir transações financeiras registradas no sistema.

## Funcionalidades

O sistema permite:

- Criar pessoa
- Editar pessoa
- Excluir pessoa
- Listar pessoas cadastradas

## Estrutura do Cadastro

Cada pessoa cadastrada possui os seguintes campos:

| Campo | Descrição |
|------|-----------|
| Identificador | Valor único gerado automaticamente pelo sistema |
| Nome | Texto com tamanho máximo de 200 caracteres |
| Idade | Valor numérico representando a idade da pessoa |

## Regra de Negócio

Ao excluir uma pessoa, **todas as transações associadas a essa pessoa também serão removidas automaticamente**.

Essa regra evita inconsistências e registros órfãos no banco de dados.

---

# Cadastro de Categorias

As categorias são utilizadas para classificar as transações financeiras registradas no sistema.

## Funcionalidades

O sistema permite:

- Criar categorias
- Listar categorias cadastradas

## Estrutura do Cadastro

| Campo | Descrição |
|------|-----------|
| Identificador | Valor único gerado automaticamente |
| Descrição | Texto com tamanho máximo de 400 caracteres |
| Finalidade | Define o tipo de transação permitido |

## Valores possíveis para Finalidade

- Despesa
- Receita
- Ambas

Essa informação é utilizada para validar o cadastro de transações.

---

# Cadastro de Transações

As transações representam movimentações financeiras realizadas por uma pessoa.

## Funcionalidades

O sistema permite:

- Criar transações
- Listar transações cadastradas

## Estrutura do Cadastro

| Campo | Descrição |
|------|-----------|
| Identificador | Valor único gerado automaticamente |
| Descrição | Texto com tamanho máximo de 400 caracteres |
| Valor | Número positivo representando o valor da transação |
| Tipo | Indica se a transação é receita ou despesa |
| Categoria | Categoria associada à transação |
| Pessoa | Pessoa associada à transação |

---

# Regras de Negócio para Transações

## Restrição para menores de idade

Caso a pessoa associada à transação tenha **menos de 18 anos**, o sistema permitirá apenas o cadastro de **transações do tipo despesa**.

Ou seja, menores de idade não podem registrar receitas.

---

## Restrição de categoria

A categoria utilizada deve ser compatível com o tipo da transação.

Exemplos:

| Tipo da Transação | Categoria Permitida |
|------------------|--------------------|
| Despesa | Categorias com finalidade Despesa ou Ambas |
| Receita | Categorias com finalidade Receita ou Ambas |

Caso a regra seja violada, o sistema deve impedir o cadastro da transação.

---

# Consulta de Totais por Pessoa

Essa funcionalidade apresenta um **resumo financeiro para cada pessoa cadastrada**.

## Informações exibidas

Para cada pessoa são apresentados:

- Total de receitas
- Total de despesas
- Saldo

Fórmula do saldo:


Saldo = Receitas - Despesas


## Totais Gerais

Ao final da listagem o sistema também apresenta:

- Total geral de receitas
- Total geral de despesas
- Saldo líquido geral

---

# Consulta de Totais por Categoria (Opcional)

O sistema também pode apresentar um resumo financeiro agrupado por categoria.

## Informações exibidas

Para cada categoria são apresentados:

- Total de receitas
- Total de despesas
- Saldo da categoria

Fórmula do saldo:


Saldo = Receitas - Despesas


## Totais Gerais

Ao final da listagem também são apresentados:

- Total geral de receitas
- Total geral de despesas
- Saldo líquido geral

Essa consulta permite identificar quais categorias concentram mais receitas ou despesas.

---

# Tecnologias Utilizadas

## Frontend

O frontend foi desenvolvido utilizando **React com TypeScript**.

### Dependências principais

- React Hook Form
- Zod
- Axios
- Radix UI
- Phosphor Icons
- React Router
- React Currency Input Field

---

## Backend

O backend foi desenvolvido utilizando **ASP.NET Core 9** seguindo o padrão de **API REST**.

### Principais bibliotecas utilizadas

#### Entity Framework Core

Responsável pelo acesso ao banco de dados.

Pacotes utilizados:

- Microsoft.EntityFrameworkCore.SqlServer
- Microsoft.EntityFrameworkCore.Design
- Microsoft.EntityFrameworkCore.Tools
- Microsoft.EntityFrameworkCore.Proxies

---

#### Dapper

Utilizado para consultas SQL de maior performance.

---

#### AutoMapper

Utilizado para mapear entidades do banco para DTOs utilizados na API.

---

#### Swagger / OpenAPI

Utilizado para documentação automática da API.

Pacotes utilizados:

- Swashbuckle.AspNetCore
- Microsoft.AspNetCore.OpenApi

---

# Arquitetura da Aplicação

A aplicação segue uma arquitetura baseada em **Frontend + API REST**.

Fluxo de funcionamento:

1. O usuário interage com a interface React
2. O frontend envia requisições HTTP utilizando Axios

## Estrutura do Projeto

O projeto segue uma estrutura **monorepo**, contendo o **backend em .NET** e o **frontend em React** no mesmo repositório.

3. A API .NET recebe as requisições e aplica as regras de negócio
4. O Entity Framework ou Dapper acessa o banco de dados
5. A resposta é retornada para o frontend e exibida na interface
