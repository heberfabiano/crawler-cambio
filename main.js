'use strict';
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

// referência global para manter a instância da janela ativa até que sejam
// fechadas pelo usuário, senão ela irá ser fechada quando o Javascript 
// executar o garbage collector
var mainWindow = null;

// sair da aplicação quando todas as janelas forem fechadas
app.on('window-all-closed', function () {
  // para MacOS a aplicação não termina quando todas as janelas são fechadas,
  // apenas quando o usuário finaliza explícitamente através do cmd+q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {
  // cria a janela do browser
  mainWindow = new BrowserWindow({ width: 1440, height: 900 });
  // desativa o menu superior padrão
  //mainWindow.setMenu(null);
  // carrega o arquivo html principal
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  // abrir o DevTools (apenas para desenvolvimento)
  //mainWindow.webContents.openDevTools();
  // evento disparado quando a janela é fechada, usado para destruir a instância
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}); 