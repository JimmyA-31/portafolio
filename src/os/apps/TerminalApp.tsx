import { useState, useRef, useEffect, type FormEvent } from 'react';
import './TerminalApp.css';

interface HistoryEntry {
  command: string;
  output: string[];
}

const COMMANDS: Record<string, string[]> = {
  help: [
    'Comandos disponibles:',
    '  about       - sobre mí',
    '  skills      - stack técnico',
    '  contact     - información de contacto',
    '  whoami      - datos rápidos',
    '  clear       - limpiar la terminal',
    '  sudo hire-me - ??? ',
  ],
  about: [
    'Jimmy Alvarez — Full Stack Developer.',
    'Egresado en Computación e Informática, con experiencia en desarrollo web y aplicaciones.',
    'Desarrollo backend sólido, datos bien diseñados y frontend moderno.',
    'Bases limpias, sistemas fáciles de mantener.',
  ],
  skills: [
    'Frontend : React, Angular, Vue',
    'Backend  : Node.js, PHP, Java, C#',
    'Datos    : SQL Server, MySQL',
    'DevOps   : Git & GitHub',
  ],
  contact: [
    'email : jimmy.alvarez.saavedra@gmail.com',
    'phone : +51 902 618 405',
    'linkedin : linkedin.com/in/jimmy-alvarez-30315225b',
    'github   : github.com/JimmyA-31',
  ],
  whoami: ['jimmy — developer, extrovertido, comprometido, puntual, siempre aprendiendo algo.'],
  'sudo hire-me': [
    'Permission granted. ✔',
    'Redirigiendo a Contacto.exe...',
  ],
};

export default function TerminalApp() {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { command: '', output: ['Bienvenido a ArcnalOS Terminal.', 'Escribe "help" para ver los comandos disponibles.'] },
  ]);
  const [input, setInput] = useState('');
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [history]);

  const runCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();

    if (cmd === 'clear') {
      setHistory([]);
      return;
    }

    const output = COMMANDS[cmd] ?? [`comando no encontrado: ${cmd}. Escribe "help" para ver opciones.`];
    setHistory((prev) => [...prev, { command: raw, output }]);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    runCommand(input);
    setInput('');
  };

  return (
    <div className="terminal-app" onClick={() => document.getElementById('terminal-input')?.focus()}>
      <div className="terminal-app-body" ref={bodyRef}>
        {history.map((entry, i) => (
          <div className="terminal-app-entry" key={i}>
            {entry.command && (
              <p className="terminal-app-line terminal-app-line--cmd">
                <span className="terminal-app-prompt">arcnal@portfolio ~$</span> {entry.command}
              </p>
            )}
            {entry.output.map((line, j) => (
              <p className="terminal-app-line" key={j}>{line}</p>
            ))}
          </div>
        ))}

        <form onSubmit={handleSubmit} className="terminal-app-line terminal-app-inputline">
          <span className="terminal-app-prompt">arcnal@portfolio ~$</span>
          <input
            id="terminal-input"
            className="terminal-app-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  );
}