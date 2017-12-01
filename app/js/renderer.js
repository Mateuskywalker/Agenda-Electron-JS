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
    console.log('teste');

    /* Fazendo a verificacao do Campo de insercao */
    let compr = novoCompr.value;

    let padraoInsercao = /\d{2}\D\d{2} -- [A-Z]...[A-Z]/;
    let inserido = new RegExp(compr,'i');

    if(!padraoInsercao.test(inserido)){

        ipcRenderer.send('abre-janela-erro');
    }else{

        template.insereNaTabela(compr);

        new Notification('AGENDA LEGAL',{
            body: 'Novo compromisso adicionado'
        })

        novoCompr.value = '';
        ipcRenderer.send('compromisso-adicionado',compr);
    }
});

if(remove.removeCompr(tabelaCompr)){
    new Notification('AGENDA LEGAL',{
        body:'compromisso removido com sucesso'
    })
}
