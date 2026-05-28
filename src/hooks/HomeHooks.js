// src/hooks/HomeHooks.js
import { useState, useRef } from 'react';
import * as Speech from 'expo-speech';

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || "AIzaSyDssclXZA9cFOIINsj2thbSwKz5QNEYT6k"; 
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export const useChatLogic = () => {
  const [mensajes, setMensajes] = useState([
    { id: '1', texto: 'Hola, soy Diana, tu asistente de bienestar emocional. 🌿 ¿Cómo te sientes el día de hoy? Estoy aquí para escucharte sin juzgar.', emisor: 'bot' },
  ]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  
  // Historial de conversación para mantener contexto
  const historialRef = useRef([
    { role: 'model', parts: [{ text: 'Hola, soy Diana, tu asistente de bienestar emocional. ¿Cómo te sientes el día de hoy? Estoy aquí para escucharte sin juzgar.' }] }
  ]);

  const hablar = (texto) => {
    Speech.stop(); 
    Speech.speak(texto, {
      language: 'es',
      pitch: 1.0,
      rate: 0.95
    });
  };

  const enviarMensaje = async () => {
    if (!nuevoMensaje.trim() || cargando) return;

    Speech.stop();

    const textoUsuario = nuevoMensaje;
    const mensajeUsuario = {
      id: Date.now().toString(),
      texto: textoUsuario,
      emisor: 'usuario',
    };

    setMensajes((prev) => [...prev, mensajeUsuario]);
    setNuevoMensaje('');
    setCargando(true);

    // Agregar mensaje del usuario al historial
    const nuevoHistorial = [
      ...historialRef.current,
      { role: 'user', parts: [{ text: textoUsuario }] }
    ];

    try {
      const response = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: nuevoHistorial,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          }
        })
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message || "Error en la API");
      }

      let respuestaTexto = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Lo siento, tuve un problema al procesar tu respuesta.';
      const textoLimpio = respuestaTexto.trim();

      const mensajeBot = {
        id: (Date.now() + 1).toString(),
        texto: textoLimpio,
        emisor: 'bot',
      };

      // Actualizar historial con la respuesta
      historialRef.current = [
        ...nuevoHistorial,
        { role: 'model', parts: [{ text: textoLimpio }] }
      ];

      setMensajes((prev) => [...prev, mensajeBot]);
      hablar(textoLimpio);

    } catch (error) {
      console.error("Error con Gemini:", error);
      const mensajeError = 'Hubo un error de conexión. Por favor, verifica tu configuración.';
      
      setMensajes((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        texto: mensajeError,
        emisor: 'bot'
      }]);

      hablar(mensajeError);
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