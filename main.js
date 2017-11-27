const {app, BrowserWindow, ipcMain} = require('electron');
const data = require('./app/js/data');

app.on('ready',() => {

    console.log('Aplicacao Iniciada');
    let mainWindow = new BrowserWindow({

        //fullscreen: true
        width: 500,
        height: 400
    });

    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

ipcMain.on('compromisso-adicionado',(event,compr) => {

    data.criaArquivoDoCompromisso(compr,compr);
});


ipcMain.on('compromisso-apagado',(event, arquivoApagado) => {

    data.removeArquivoDaPasta(arquivoApagado);
});
