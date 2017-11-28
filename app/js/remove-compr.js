const {ipcRenderer} = require('electron');

module.exports = {

    removeCompr(tabela){

            tabela.addEventListener('dblclick',(event) => {

                event.target.parentNode.classList.add('fadeOut');

                let arquivoApagado = event.target.parentNode.textContent; // nome do arquivo

                ipcRenderer.send('compromisso-apagado', arquivoApagado);

                setTimeout(function() {
                    event.target.parentNode.remove();
                }, 500);
            })
        }
}
