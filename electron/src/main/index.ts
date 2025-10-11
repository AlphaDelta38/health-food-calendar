import { app, BrowserWindow, Menu } from 'electron';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 1024,
    minHeight: 768,
    webPreferences: {
      preload: join(__dirname, '../preload/preload.js'),
    },
  });
  
  

  win.loadURL('http://localhost:5173');
}

app.whenReady().then(() => {
  createWindow();

  const protocol = "calenDish";
  if (!app.isDefaultProtocolClient(protocol)) {
    app.setAsDefaultProtocolClient(protocol);
  }

  // const userDataPath = app.getPath("userData"); // TODO: add userDataPath to the server

  Menu.setApplicationMenu(null);


  
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

