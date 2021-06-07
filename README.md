# poll-generator-frontend

## O que é

Frontend do app de criação de enquetes.

Este frontend consome dados do meu [Poll Generator](https://github.com/renanstd/poll-generator), um app feito em Django, que fornece um endpoint REST para cadastro de enquetes e votação, e um endpoint websocket para exibição dos resultados em tempo real.

Este projeto foi desenvolvido no intuito de ajudar meus amigos do canal [Público Geral](https://www.instagram.com/publicogeraloficial/) na criação de enquetes durante sessões de RPG transmitidas ao vivo pelo [Youtube](https://www.youtube.com/channel/UCiX7AWd2w9mC-iaZRFfUs_w).

O objetivo era ter uma área **pública**, onde os usuários votem nas enquetes ativas, e uma área exclusiva do **mestre**, onde é possível criar, encerrar, e reativar enquetes, assim como acompanhar as votações em tempo real.

![polls](/images/polls.png)

![polls](/images/poll_create.png)

![polls](/images/results.png)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
