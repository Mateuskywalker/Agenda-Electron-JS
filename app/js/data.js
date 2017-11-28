const jsonfile = require('jsonfile-promised');
const fs = require('fs'); // fileSystem

module.exports = {

    criaArquivoDoCompromisso(nomeCompr, conteudo){

        let arquivoCurso = __dirname + '/data/' + nomeCompr + '.json';


        jsonfile.writeFile(arquivoCurso,{compromisso:conteudo})
            .then(() => {
                console.log('Compromisso salvo com sucesso!');
            })
            .catch(err => {
                console.log(err);
            })
    },

    /* retornando uma promisse */
    pegaDados(compr){

        let arquivoCompr = __dirname + '/data/' + compr + '.json';
        return jsonfile.readFile(arquivoCompr);
    },

    /* retorna o nome dos compromissos presentes na pasta */
    pegaNomeDoCompromisso(){
        let arquivos = fs.readdirSync(__dirname + '/data/');
        let compromissos = arquivos.map(arquivo => {
            return arquivo.substr(0,arquivo.lastIndexOf('.'));
        });
        return compromissos;
    },

    removeArquivoDaPasta(arquivo){

        let pastaAtual = __dirname + '/data/';
        let arquivoAtual = pastaAtual + arquivo + '.json';
        fs.unlinkSync(arquivoAtual);
    }
}
