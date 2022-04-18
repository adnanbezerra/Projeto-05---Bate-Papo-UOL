let nome;
let novoNome;

entraNome();

// Este bloco é responsável por tratar da entrada de nome de usuário no sistema.
function entraNome() {
    nome = {
        name: prompt("Qual o seu lindo nome?")
    } 
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", nome)

    promise.catch(deuRuim)
}

// Sim, eu usei recursividade. A faculdade tem de me servir pra algo
function deuRuim(resposta) {
    const statusCode = resposta.status;
    if (statusCode === 400) {
        novoNome = {
            name: prompt("Nome já registrado! Insira outro para continuar")
        } 
        const promiseNova = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", novoNome)

        promiseNova.then(deuBom)
        promiseNova.catch(deuRuim)
    }
}

function deuBom(resposta) {
    const statusCode = resposta.status;
    if (statusCode === 200) nome = novoNome;
}

// Habemus o meio utilizado para verificar se o usuário está online
const verificaOnline = setInterval( () => {
    const verificacao = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", nome);
    
    if(verificacao.status === 'offline') entraNome;
}, 5000);