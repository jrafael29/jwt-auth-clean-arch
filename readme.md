Aplicação feita com o propósito de aprender e praticar Arquitetura Limpa. (Desacoplamento)

Para rodar a aplicação: 
```npm run start:dev```

Para rodar os testes: 
```npm test```

Teste com cURL

* ROTA PUBLICA
```curl -X GET -H "Content-Type: application/json" http://127.0.0.1:3333/```

* REGISTRO 
```curl -X POST -H "Content-Type: application/json" -d '{"name":"Josef","phonenumber":"+5581991111111","password":"1234567","repeatPassword":"1234567"}' http://127.0.0.1:3333/register```

* LOGIN
```curl -X POST -H "Content-Type: application/json" -d '{"credential":"+5581991111111","password":"1234567"}' http://127.0.0.1:3333/login```


* ROTA PRIVADA (replace token)
```curl -X GET -H "Content-Type: application/json" -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoie1wiaWRcIjoyfSIsImlhdCI6MTcwNTIwMzc0OCwiZXhwIjoxNzA1MjI4OTQ4fQ.wU7T27fBSXTJ_5ulAMXWLRS1dxWe-ba76ly73kqHwM8" http://127.0.0.1:3333/pvt```


__desenvolvido por José Rafael__