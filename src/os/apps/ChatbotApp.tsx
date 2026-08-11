import { useState, useRef, useEffect } from 'react';
import { Robot } from '@phosphor-icons/react';
import './ChatbotApp.css';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    id: 'disponibilidad',
    question: '¿Estás disponible para trabajar?',
    answer: 'Sí, estoy disponible para nuevos proyectos y oportunidades laborales. Puedes escribirme por LinkedIn o email desde Contacto.db.',
  },
  {
    id: 'stack',
    question: '¿Con qué tecnologías trabajas?',
    answer: 'Backend: PHP, Java, C#, Node.js. Frontend: React, Angular, Vue. Datos: SQL Server, MySQL. Puedes ver el detalle completo en skills.map.',
  },
  {
    id: 'experiencia',
    question: '¿Cuánta experiencia tienes?',
    answer: 'Tengo experiencia profesional en desarrollo full stack desde 2024, incluyendo roles en G2 Solution y Overskull S.A.C., además de proyectos personales y académicos.',
  },
  {
    id: 'proyectos',
    question: '¿Qué proyectos has hecho?',
    answer: 'Sitios web para empresas reales (Whizzet, G2 Solution) y un e-commerce completo (ShopVue) con Vue.js. Puedes verlos con demo en vivo en la ventana Proyectos.',
  },
  {
    id: 'modalidad',
    question: '¿Trabajas remoto o presencial?',
    answer: 'Estoy abierto a ambas modalidades, remoto, híbrido o presencial en Lima, Perú — según lo que necesite el equipo.',
  },
  {
    id: 'contacto',
    question: '¿Cómo te contacto?',
    answer: 'Por email (jimmy.alvarez.saavedra@gmail.com), LinkedIn o el formulario de Contacto.db. Respondo normalmente en menos de 24 horas.',
  },
];

interface ChatEntry {
  from: 'user' | 'bot';
  text: string;
}

export default function ChatbotApp() {
  const [chat, setChat] = useState<ChatEntry[]>([
    { from: 'bot', text: 'Hola 👋 Soy el asistente de Jimmy. Elige una pregunta abajo, o repite la conversación las veces que quieras.' },
  ]);
  const [askedIds, setAskedIds] = useState<Set<string>>(new Set());
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' });
  }, [chat]);

  const handleAsk = (faq: FaqItem) => {
    setChat((prev) => [...prev, { from: 'user', text: faq.question }, { from: 'bot', text: faq.answer }]);
    setAskedIds((prev) => new Set(prev).add(faq.id));
  };

  const handleReset = () => {
    setChat([{ from: 'bot', text: 'Conversación reiniciada. ¿En qué más te puedo ayudar?' }]);
    setAskedIds(new Set());
  };

  const pending = faqs.filter((f) => !askedIds.has(f.id));

  return (
    <div className="chatbot-app">
      <div className="chatbot-header">
        <Robot size={18} weight="duotone" color="var(--os-accent)" />
        <span>Asistente virtual</span>
      </div>

      <div className="chatbot-body" ref={bodyRef}>
        {chat.map((entry, i) => (
          <div key={i} className={`chatbot-bubble chatbot-bubble--${entry.from}`}>
            {entry.text}
          </div>
        ))}
      </div>

      <div className="chatbot-suggestions">
        {pending.length === 0 ? (
          <button type="button" className="chatbot-reset" onClick={handleReset}>
            Reiniciar preguntas
          </button>
        ) : (
          pending.map((faq) => (
            <button key={faq.id} type="button" className="chatbot-suggestion" onClick={() => handleAsk(faq)}>
              {faq.question}
            </button>
          ))
        )}
      </div>
    </div>
  );
}