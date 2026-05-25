// src/hooks/HomeHooks.js
import { useState } from 'react';

const GEMINI_API_KEY = "AIzaSyBOsjHuabBifj1ocGn5RoZBU28lqNhUwh0"; 
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export const useChatLogic = () => {
  const [mensajes, setMensajes] = useState([
    { id: '1', texto: 'Hola, soy tu asistente de bienestar emocional. 🌿 ¿Cómo te sientes el día de hoy? Estoy aquí para escucharte sin juzgar.', emisor: 'bot' },
  ]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  const enviarMensaje = async () => {
    if (!nuevoMensaje.trim() || cargando) return;

    const textoUsuario = nuevoMensaje;
    const mensajeUsuario = {
      id: Date.now().toString(),
      texto: textoUsuario,
      emisor: 'usuario',
    };

    setMensajes((prev) => [...prev, mensajeUsuario]);
    setNuevoMensaje('');
    setCargando(true);

    try {
      const response = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Actúa como un psicólogo y asistente de bienestar emocional empático, reflexivo y profesional. Responde de forma breve y cercana al siguiente comentario del usuario sin usar markdown complejo: ${textoUsuario}`
            }]
          }]
        })
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message || "Error en la API");
      }

      const respuestaTexto = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Lo siento, tuve un problema al procesar tu respuesta.';

      const mensajeBot = {
        id: (Date.now() + 1).toString(),
        texto: respuestaTexto.trim(),
        emisor: 'bot',
      };

      setMensajes((prev) => [...prev, mensajeBot]);

    } catch (error) {
      console.error("Error con Gemini:", error);
      setMensajes((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        texto: 'Hubo un error de conexión. Por favor, verifica tu configuración.',
        emisor: 'bot'
      }]);
    } finally {
      setCargando(false);
    }
  };

  return {
    mensajes,
    nuevoMensaje,
    setNuevoMensaje,
    cargando,
    enviarMensaje
  };
};