# Amigo Secreto Online App
## Funcionalidades
* Crude de usuários
* Perfil com foto
* Cadastro de grupos
* Associação a grupos por chave compartilhada
* Sorteio de amigo oculto 

## Telas
![EAR das tabelas](https://raw.githubusercontent.com/srBruning/amigo_secreto/main/screenshots/login.png)
![EAR das tabelas](https://raw.githubusercontent.com/srBruning/amigo_secreto/main/screenshots/registro.png)
![EAR das tabelas](https://raw.githubusercontent.com/srBruning/amigo_secreto/main/screenshots/home.png)
![EAR das tabelas](https://raw.githubusercontent.com/srBruning/amigo_secreto/main/screenshots/grupo.png)


## Demo
A aplicação esta funcionado como demostração em [dibr.cc](https://dibr.cc)

## Modelagem
![EAR das tabelas](https://raw.githubusercontent.com/srBruning/amigo_secreto/desenv/modeling/erd.svg)

##  back-end
o back-and foi desenvolvido com banco de dados mysql e com a linguagem javascript utilizando NodeJs
para versionamento de banco foi utilizado a biblioteca [Sequelize ORM](https://sequelize.org/) 

#### Configurações 
* Base de dados 
É preciso  configura no arquivo /server/.env NAME_DB, USERNMAE_DB e PASSWORD_DB 
* Armazenamento de imagens
O armazenamento é feito em Amazon S3 (s3)  ou em arquivo no servidor (local) 
é preciso configurar no arquivo /server/.env os campos  
STORAGE_TYPE (local ou s3) 
AWS_ACCESS_KEY_ID 
AWS_SECRET_ACCESS_KEY 
AWS_DEFAULT_REGION 
* Geração de token
É preciso  configura no arquivo /server/.env  o campo SECRET com a palavra secreta para geração dos token de autenticação. 


```bash
# /server/.env
APP_URL=http://localhost:3636
PORTA=3636
STORAGE_TYPE=S3
SECRET=my_secret
AWS_ACCESS_KEY_ID=my_aws_access_key_id
AWS_SECRET_ACCESS_KEY=my_aws_secret_access_key
AWS_DEFAULT_REGION=my_default_region
NAME_DB=amigo_secreto
USERNMAE_DB=admin
PASSWORD_DB=PASSWORD_DB
```
### Instalação e execução 
* Instalando Dependências
```bash
$ cd server/
$ yarn 
$ # criando as tabelas
$ npx sequelize-cli db:migrate
```
* Atualizado o Banco
```bash
$ cd server/
$ # run migrations
$ npx sequelize-cli db:migrate
```
* executando 

```bash
$ # em desenvolvimento
$ yarn dev
```
```bash
$ # em produção
$ yarn start
```


##  Front-end
No front-end foi desenvolvido uma SPA  utilizado React Js.

### Configuração
precisamos configurar os aquivos ``/client/.env.local`` e ``/client/.env.prodution`` com o endereço do back-end e a chave do RollBar

```bash
# /client/.env.local
REACT_APP_API=http://207.154.237.32:4646
REACT_APP_ROLLBAR_CLINT_KEY=ROLLBAR_CLINT_KEY
```

### Instalação e Execução 
* instalando dependências
```bash
$ cd clinet/
$ yarn
```
* Executando 
```bash
$ # desenvolvimento
$ yarn run start
$ # in http://localhost:3000
```
Para rodar em produção precisamos exportar para arquivos estáticos com o comando ``build`` e disponibilizar no servidor
```bash
$ yarn build 
```


