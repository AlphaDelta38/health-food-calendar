import { app, BrowserWindow, Menu } from 'electron';
import { join } from 'path';

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 1024,
    minHeight: 768,
    webPreferences: {

      preload: join(__dirname, '../preload/index.js'),
    },
  });
  
  win.loadFile(join(__dirname, "../../client/index.html"));
}

app.whenReady().then(async () => {  
  const protocol = "calenDish";
  if (!app.isDefaultProtocolClient(protocol)) {
    app.setAsDefaultProtocolClient(protocol);
  }
  
  const serverPath = join(__dirname, '../../server/index.js');
  const { startServer } = require(serverPath)

  const userDataPath = app.getPath("userData");

  Menu.setApplicationMenu(null);

  startServer(userDataPath); 

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  app.on("open-url", (event, url) => {
    event.preventDefault();

    const params = new URLSearchParams(url.split("?")[1]);
    const code = params.get("code");
    const state = params.get("state");

    if (code && state) {
      fetch("http://localhost:5000/google-disk/auth/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, state }),
      });
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});