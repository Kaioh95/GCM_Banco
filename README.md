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

## 1. Docker
## 1.1 instalando docker
Veja abaixo os passos para contruir imagens docker do frontend e backend da aplicação (recomenda-se utilizar o Linux). Caso o docker não esteja instalado na sua máquina execute os comandos:
```bash:
sudo apt install docker docker.io docker-compose
sudo systemctl enable --now docker docker.socket containerd
```

## 1.2 super usuário
Para executar comandos docker é necessário permissão de super usuário, (opicional: faça login na sua conta Docker Hub):
```bash:
sudo su
docker login -u your-user-name
```

## 1.3 baixando imagens
Para criar as imagens deste app é necessário baixar as imagens do mongo e do node:
```bash:
docker pull mongo
docker pull node:16.20.1-alpine
docker images
```
## 1.4 criado volume
O MongoDB é usado como banco de dados, logo iremos criar um volume para que os dados sejam persistidos na sua máquina quando o container for parado:
```bash:
docker volume create volume-mongo
docker inspect volume-mongo
```

## 1.5  criando network
A seguir criaremos uma network para possibilitar a comunicação entre os container:
```bash:
docker network create banco-net
docker network ls
```

## 1.5.1  conectando à network manualmente (opcional)
É possível conenctar um container preexiste à rede (opcional):
```bash:
docker network connect banco-net banco-db
docker network disconnect bridge banco-db
```

## 1.6  criando imagem do banco de dados
O próximo passo cria um container de nome banco-db com base na imagem do mongo, utilizando a porta 27017, conectado à network banco-net:
```bash:
docker run -d --rm --name banco-db -p "27017:27017" -v "volume-mongo:/data/db" --network=banco-net mongo
docker ps -a
```

## 1.7  criando imagens dos backend e frontend
A seguir, entre nas pastas do backend e frontend da aplicação e gere as imagens repectivamente:
```bash:
cd banco_web
docker build -t banco-back-img .
cd ..

cd banco
docker build -t banco-front-img .
cd ..
```

## 1.8  iniciando containers
Agora inicie cada container:
```bash:
docker run -it --rm --name banco-api -p "8080:8080" --network=banco-net banco-back-img
docker run -it --rm --name banco-f -p "5173:5173" --network=banco-net banco-front-img
```

## 1.9  publicando images no dockerhub (opcional)
(Opcional) Caso tenha logado ao Docker Hub, você pode publicar suas imagens:
```
docker tag banco-back-img YOUR-USER-NAME/banco-back-img
docker push YOUR-USER-NAME/banco-back-img
```

# 2. Docker Compose
Com o docker compose é possível fazer o build das imagens e iniciá-las em um comando só. Usando este projeto como exemplo, execute os passos 1.1 à 1.5 e com o terminal na pasta raiz do projeto onde é possível encontrar um arquivo chamado **docker-compose.yml** execute o comando `docker-compose up`. Você pode usar o comando `docker-compose down` caso queira para e remover os containers.
