const {ipcRenderer} = require('electron');

let Okerro = document.querySelector('#OkErro');

Okerro.addEventListener('click',() =>{

    ipcRenderer.send('OkErro-clicado');
});
