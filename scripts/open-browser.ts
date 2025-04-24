import { spawn } from 'child_process';

// URL da aprire
const url = 'http://localhost:3000';

// Avvia xdg-open in modo detach
const subprocess = spawn('xdg-open', [url], {
  detached: true,
  stdio: 'ignore',
});

// Stacca completamente il processo
subprocess.unref();
