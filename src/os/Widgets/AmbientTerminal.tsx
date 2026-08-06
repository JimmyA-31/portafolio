import { useEffect, useState } from 'react';
import './AmbientTerminal.css';

const phrases = [
  '> status: disponible para nuevos proyectos',
  '> stack Frontend: React · Angular · Vue · Node.js',
  '> stack Backend: Java · PHP · Python',
  '> Database: SQLServer · Supabase · MySQL',
  '> compiling portfolio... done',
  '> Tiempo de actividad: 100% desde 2024',
];

export default function AmbientTerminal() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState('');

  useEffect(() => {
    let charIndex = 0;
    setText('');
    const current = phrases[phraseIndex];

    const typing = setInterval(() => {
      charIndex += 1;
      setText(current.slice(0, charIndex));
      if (charIndex >= current.length) {
        clearInterval(typing);
        setTimeout(() => {
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }, 2200);
      }
    }, 45);

    return () => clearInterval(typing);
  }, [phraseIndex]);

  return (
    <div className="ambient-terminal">
      <span>{text}</span>
      <span className="ambient-terminal-cursor" />
    </div>
  );
}