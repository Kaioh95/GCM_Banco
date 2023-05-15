# GCM_Banco

### Boas práticas do controle de versões
O padrão de boas práticas utilizado será o GitFlow, com o seguinte esquema de branches:

![image](https://github.com/Kaioh95/GCM_Banco/assets/42385515/9ecc87b4-0b7b-43b4-bba3-abbe4f385ad1)

## Autores:
- Kaio Henrique de Souza
- Alexandre Dantas dos Santos

## Objetivos do projeto
- Desenvolvimento de sistema bancário utilizando o fluxo de trabalho: GitFlow.

## Requisitos do projeto

- Cadastrar Conta: Solicita um número e cria uma conta com este número e saldo igual a zero.
- Consulta Saldo: Solicita um número de conta e exibe o saldo da conta.
- Crédito: Solicita um número e valor. Atualiza a conta informada acrescentando o valor informado ao saldo.
- Débito: Solicita um número e valor. Atualiza a conta informada subtraindo o valor informado ao saldo.
- Transferência: Solicita o número de conta de origem, número de conta de destino e valor a ser transferido. Realiza o débito da conta de origem e o crédito na conta destino.

## Requisitos adicionais
- As contas podem ter saldo negativo.
- Não existe limite de número de contas que podem ser criadas.
- A conta deve ter apenas os atributos número e saldo.
