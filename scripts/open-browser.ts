import { spawn } from 'child_process';

// Legge il parametro dalla CLI (process.argv[2])
const argUrl = process.argv.find(arg => arg.startsWith("--url="));
const url = argUrl ? argUrl.split("=")[1] : "http://localhost:3000"

if (!url) {
  console.error("Errore: devi passare un URL come argomento.");
  process.exit(1);
}


// Avvia xdg-open in modo detach
const subprocess = spawn('xdg-open', [url], {
  detached: true,
  stdio: 'ignore',
});

// Stacca completamente il processo
subprocess.unref();
