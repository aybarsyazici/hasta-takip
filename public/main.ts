
const { app, BrowserWindow } = require("electron");

const remoteMain = require("@electron/remote/main");
remoteMain.initialize();

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 900,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
        },
        title: "Hasta Takip",
        icon: __dirname + "/hospital.png"
    })
    remoteMain.enable(win.webContents);
    win.loadURL("http://localhost:3000");
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
})
