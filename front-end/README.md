# Front End
## Inicializando o ambiente

```bash
npm install
npm start
```
## Arquivo HTTP-COMMON controla as reqs.

mss/front-end/src/services/http-common.js

```
# Alterar para testar apontando para um back local

export default axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-type": "application/json",
        "authorization": `Bearer ${localStorage.getItem("user-token")}`
    }
});
```
```
# Alterar para testar apontando para um back nuvem

export default axios.create({
    baseURL: "https://pure-shelf-85340.herokuapp.com/mss",
    headers: {
        "Content-type": "application/json",
        "authorization": `Bearer ${localStorage.getItem("user-token")}`
    }
});
```
