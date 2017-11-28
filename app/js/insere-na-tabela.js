
module.exports = {

    montaTd(textoCompr){

        let td = document.createElement('td');
        td.textContent = textoCompr;
        return td;
    },

    montaTr(td1){

        let tr = document.createElement('tr');
        tr.appendChild(td1);
        return tr;
    },

    insereNaTabela(textoCompr){

        let td2 = this.montaTd(textoCompr);
        let compromisso = this.montaTr(td2);
        let tabelaCompr = document.querySelector('.tabela-compromissos');
        tabelaCompr.appendChild(compromisso);
    }
}
