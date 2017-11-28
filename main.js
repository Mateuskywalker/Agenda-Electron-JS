const {app, BrowserWindow, ipcMain} = require('electron');
const data = require('./app/js/data');

app.on('ready',() => {

    console.log('Aplicacao Iniciada');
    let mainWindow = new BrowserWindow({

        //fullscreen: true
        width: 700,
        height: 500
    });

    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

ipcMain.on('compromisso-adicionado',(event,compr) => {

    data.criaArquivoDoCompromisso(compr,compr);
});


ipcMain.on('compromisso-apagado',(event, arquivoApagado) => {

    data.removeArquivoDaPasta(arquivoApagado);
});

let errorWindow = null;
ipcMain.on('abre-janela-erro',() => {
    errorWindow = new BrowserWindow({

        width:500,
        height:100,
        alwaysOnTop:true,
    });
    errorWindow.loadURL(`file://${__dirname}/app/erro.html`)
});
