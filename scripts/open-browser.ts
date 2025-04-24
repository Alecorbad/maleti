import { spawn } from 'child_process';

// URL da aprire
const url = 'http://192.168.178.174:3000';

// Avvia xdg-open in modo detach
const subprocess = spawn('xdg-open', [url], {
  detached: true,
  stdio: 'ignore',
});

// Stacca completamente il processo
subprocess.unref();
