import { useEffect, useState } from 'react';
import './MobileIntro.css';

const phrases = [
  'Hola, soy Jimmy 👋',
  'Full Stack Developer',
  'Toca un ícono para explorar',
];

export default function MobileIntro() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];
    const speed = deleting ? 30 : 55;

    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) {
          setTimeout(() => setDeleting(true), 1400);
        }
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === '') {
          setDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, deleting, phraseIndex]);

  return (
    <div className="mobile-intro">
      <span className="mobile-intro-text">{text}</span>
      <span className="mobile-intro-cursor" />
    </div>
  );
}