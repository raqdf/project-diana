// src/screens/HomeScreen.js
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';

// ⚠️ REEMPLAZA ESTO CON TU API KEY DE GOOGLE AI STUDIO
const GEMINI_API_KEY = "AIzaSyCJvxGLByIYFGY_7q4L_xehM3vJyzo2m3w"; 
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export default function HomeScreen() {
  const [mensajes, setMensajes] = useState([
    { id: '1', texto: 'Hola, soy tu asistente de bienestar emocional. 🌿 ¿Cómo te sientes el día de hoy? Estoy aquí para escucharte sin juzgar.', emisor: 'bot' },
  ]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [cargando, setCargando] = useState(false); // Estado para mostrar que el bot está pensando
  const flatListRef = useRef();

  const enviarMensaje = async () => {
    if (!nuevoMensaje.trim() || cargando) return;

    const textoUsuario = nuevoMensaje;
    const mensajeUsuario = {
      id: Date.now().toString(),
      texto: textoUsuario,
      emisor: 'usuario',
    };

    // 1. Mostrar el mensaje del usuario e iniciar animación de carga
    setMensajes((prev) => [...prev, mensajeUsuario]);
    setNuevoMensaje('');
    setCargando(true);

    try {
      // 2. Llamada real a la API de Gemini mediante fetch nativo
      const response = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              // Le damos instrucciones de rol (System Prompt) junto al mensaje del usuario
              text: `Actúa como un psicólogo y asistente de bienestar emocional empático, reflexivo y profesional. Responde de forma breve y cercana al siguiente comentario del usuario sin usar markdown complejo: ${textoUsuario}`
            }]
          }]
        })
      });

      const data = await response.json();
      
      // 3. Extraer el texto de la respuesta de Gemini
      const respuestaTexto = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Lo siento, tuve un problema al procesar tu respuesta. ¿Me lo repites?';

      const mensajeBot = {
        id: (Date.now() + 1).toString(),
        texto: respuestaTexto.trim(),
        emisor: 'bot',
      };

      setMensajes((prev) => [...prev, mensajeBot]);

    } catch (error) {
      console.error("Error con Gemini:", error);
      // Mensaje de error amigable en la interfaz
      setMensajes((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        texto: 'Hubo un error de conexión. Por favor, verifica tu configuración o API Key.',
        emisor: 'bot'
      }]);
    } finally {
      setCargando(false); // Apagar indicador de carga
    }
  };

  const renderItem = ({ item }) => {
    const esBot = item.emisor === 'bot';
    return (
      <View style={[styles.bubbleContainer, esBot ? styles.alignLeft : styles.alignRight]}>
        <View style={[styles.bubble, esBot ? styles.botBubble : styles.userBubble]}>
          <Text style={[styles.messageText, esBot ? styles.botText : styles.userText]}>
            {item.texto}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      {/* Encabezado */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarIcon}>🧠</Text>
        </View>
        <View>
          <Text style={styles.title}>MenteSana AI</Text>
          <Text style={styles.status}>• En línea contigo</Text>
        </View>
      </View>

      {/* Historial de conversación */}
      <FlatList
        ref={flatListRef}
        data={mensajes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      {/* Indicador visual cuando Gemini está respondiendo */}
      {cargando && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#8b5cf6" />
          <Text style={styles.loadingText}>MenteSana está pensando...</Text>
        </View>
      )}

      {/* Entrada de texto inferior */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={cargando ? "Esperando respuesta..." : "Escribe cómo te sientes aquí..."}
          placeholderTextColor="#71717a"
          value={nuevoMensaje}
          onChangeText={setNuevoMensaje}
          multiline
          editable={!cargando} // Deshabilitar entrada mientras carga
        />
        <TouchableOpacity 
          style={[styles.sendButton, cargando && styles.sendButtonDisabled]} 
          onPress={enviarMensaje}
          disabled={cargando}
        >
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121214' },
  header: { paddingTop: 40, paddingBottom: 15, paddingHorizontal: 20, backgroundColor: '#1a1a1e', flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: '#29292e' },
  avatarContainer: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: '#29292e', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  avatarIcon: { fontSize: 22 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#ffffff' },
  status: { fontSize: 12, color: '#10b981', marginTop: 2 },
  chatList: { paddingHorizontal: 16, paddingVertical: 20 },
  bubbleContainer: { width: '100%', marginBottom: 14, flexDirection: 'row' },
  alignLeft: { justifyContent: 'flex-start' },
  alignRight: { justifyContent: 'flex-end' },
  bubble: { maxWidth: '80%', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 16 },
  botBubble: { backgroundColor: '#202024', borderTopLeftRadius: 4 },
  userBubble: { backgroundColor: '#8b5cf6', borderTopRightRadius: 4 },
  messageText: { fontSize: 15, lineHeight: 20 },
  botText: { color: '#e1e1e6' },
  userText: { color: '#ffffff', fontWeight: '500' },
  loadingContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 10 },
  loadingText: { color: '#71717a', fontSize: 13, marginLeft: 8 },
  inputContainer: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#1a1a1e', alignItems: 'center', borderTopWidth: 1, borderColor: '#29292e' },
  input: { flex: 1, backgroundColor: '#202024', color: '#ffffff', borderRadius: 24, paddingHorizontal: 18, paddingVertical: 10, fontSize: 15, maxHeight: 100, marginRight: 12 },
  sendButton: { backgroundColor: '#8b5cf6', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, justifyContent: 'center', alignItems: 'center' },
  sendButtonDisabled: { backgroundColor: '#4c1d95' },
  sendButtonText: { color: '#ffffff', fontWeight: 'bold', fontSize: 14 },
});