// src/screens/HomeScreen.js
import React from 'react';
import { useChatLogic } from '../hooks/HomeHooks';
import { ChatInterface } from '../components/HomeComponents';

export default function HomeScreen() {
  const chatProps = useChatLogic();

  // Renderizamos la vista inyectándole todos los estados correspondientes
  return <ChatInterface {...chatProps} />;
}