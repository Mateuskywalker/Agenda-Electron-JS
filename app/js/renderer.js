const {ipcRenderer} = require('electron');
const template = require('./insere-na-tabela');
const remove = require('./remove-compr');
const data = require('./data');

let botaoEnviar = document.querySelector('.botao');
let novoCompr = document.querySelector('#compromisso');
let tabelaCompr = document.querySelector('.tabela-compromissos');
let calendario = document.querySelector('.calendario');

/* Trazendo o resultado do calendario */
calendario.addEventListener('click',(event)=>{

    event.preventDefault();
    let data = calendario.value

    /* Acha o mes e o dia selecionados: -mm-dd*/
    let mesDia = /\D\d{2}\D\d{2}$/;
    let resultado = mesDia.exec(data);
    console.log(resultado);
});


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
