# GCM_Banco

### Boas práticas do controle de versões
O padrão de boas práticas utilizado será o GitFlow, com o seguinte esquema de branches:

![image](https://github.com/Kaioh95/GCM_Banco/assets/42385515/9ecc87b4-0b7b-43b4-bba3-abbe4f385ad1)

## Autores:
- Kaio Henrique de Souza
- Alexandre Dantas dos Santos
- Douglas Alexandre dos Santos

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

## Docker

Veja abaixo os passos para contruir imagens docker do frontend e backend da aplicação (recomenda-se utilizar o Linux). Caso o docker não esteja instalado na sua máquina execute os comandos:
```
sudo apt install docker docker.io docker-compose
sudo systemctl enable --now docker docker.socket containerd
```

Para executar comandos docker é necessário permissão de super usuário, (opicional: faça login na sua conta Docker Hub):
```
sudo su
docker login -u your-user-name
```

Para criar as imagens deste app é necessário baixar as imagens do mongo e do node:
```
docker pull mongo
docker pull node:16.20.1-alpine
docker images
```

O MongoDB é usado como banco de dados, logo iremos criar um volume para que os dados sejam persistidos na sua máquina quando o container for parado:
```
docker volume create volume-mongo
docker inspect volume-mongo
```

A seguir criaremos uma network para possibilitar a comunicação entre os container:
```
docker network create banco-net
docker network ls
```

É possível conenctar um container preexiste à rede (opcional):
```
docker network connect banco-net banco-db
docker network disconnect bridge banco-db
```

O próximo passo cria um container de nome banco-db com base na imagem do mongo, utilizando a porta 27017, conectado à network banco-net:
```
docker run -d --rm --name banco-db -p "27017:27017" -v "volume-mongo:/data/db" --network=banco-net mongo
docker ps -a
```

A seguir, entre nas pastas do backend e frontend da aplicação e gere as imagens repectivamente:
```
cd banco_web
docker build -t banco-back-img .
cd ..

cd banco
docker build -t banco-front-img .
cd ..
```

Agora inicie cada container:
```
docker run -it --rm --name banco-api -p "8080:8080" --network=banco-net banco-back-img
docker run -it --rm --name banco-f -p "5173:5173" --network=banco-net banco-front-img
```

(Opcional) Caso tenha logado ao Docker Hub, você pode publicar suas imagens:
```
docker tag banco-back-img YOUR-USER-NAME/banco-back-img
docker push YOUR-USER-NAME/banco-back-img
```