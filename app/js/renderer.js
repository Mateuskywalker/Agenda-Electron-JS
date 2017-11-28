const {ipcRenderer} = require('electron');
const template = require('./insere-na-tabela');
const remove = require('./remove-compr');
const data = require('./data');

let botaoEnviar = document.querySelector('.botao');
let novoCompr = document.querySelector('#compromisso');
let tabelaCompr = document.querySelector('.tabela-compromissos');

window.onload = () => {

    let compromissos = data.pegaNomeDoCompromisso();
    compromissos.forEach(compromisso => {
        data.pegaDados(compromisso)
            .then(() => {
                template.insereNaTabela(compromisso);
            })
    })
}

botaoEnviar.addEventListener('click', event => {

    event.preventDefault();

    let compr = novoCompr.value;
    console.log(compr);

    template.insereNaTabela(compr);

    new Notification('AGENDA LEGAL',{
        body: 'Novo compromisso adicionado'
    })

    novoCompr.value = '';
    ipcRenderer.send('compromisso-adicionado',compr);
});

if(remove.removeCompr(tabelaCompr)){
    new Notification('AGENDA LEGAL',{
        body:'compromisso removido com sucesso'
    })
}
