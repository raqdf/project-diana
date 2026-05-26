// src/components/HomeComponents.js
import React, { useRef, useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  FlatList, KeyboardAvoidingView, Platform, ActivityIndicator, 
  Modal, ScrollView, Animated, Dimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

// Componente de Perfil del Psicólogo
function PsychologistProfile({ visible, onClose }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={['#1a1a1e', '#0f0f13']}
            style={styles.modalGradient}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Perfil del Psicólogo</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Avatar y nombre */}
              <View style={styles.profileAvatarContainer}>
                <LinearGradient
                  colors={['#8b5cf6', '#6d28d9']}
                  style={styles.profileAvatar}
                >
                  <Text style={styles.profileAvatarIcon}>🧠</Text>
                </LinearGradient>
                <Text style={styles.profileName}>Dr. MenteSana AI</Text>
                <Text style={styles.profileTitle}>Psicólogo Clínico Especialista</Text>
                <View style={styles.badgeContainer}>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>Colegiado: PS-45892</Text>
                  </View>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>10+ años experiencia</Text>
                  </View>
                </View>
              </View>

              {/* Características del Psicólogo */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>🎓 Formación Académica</Text>
                <View style={styles.card}>
                  <Text style={styles.cardText}>• Doctorado en Psicología Clínica - Universidad de Barcelona</Text>
                  <Text style={styles.cardText}>• Máster en Terapia Cognitivo-Conductual</Text>
                  <Text style={styles.cardText}>• Especialización en Trastornos de Ansiedad</Text>
                  <Text style={styles.cardText}>• Certificación en Mindfulness y Bienestar Emocional</Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>💼 Experiencia Profesional</Text>
                <View style={styles.card}>
                  <Text style={styles.cardText}>• Director clínico en Centro de Salud Mental "MenteSana"</Text>
                  <Text style={styles.cardText}>• 8 años en práctica privada con pacientes de ansiedad</Text>
                  <Text style={styles.cardText}>• Investigador en terapias digitales para salud mental</Text>
                  <Text style={styles.cardText}>• Conferencista internacional en psicología positiva</Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>🏆 Especialidades</Text>
                <View style={styles.specialtiesContainer}>
                  <View style={styles.specialtyTag}>
                    <Text style={styles.specialtyText}>Ansiedad</Text>
                  </View>
                  <View style={styles.specialtyTag}>
                    <Text style={styles.specialtyText}>Depresión</Text>
                  </View>
                  <View style={styles.specialtyTag}>
                    <Text style={styles.specialtyText}>Estrés</Text>
                  </View>
                  <View style={styles.specialtyTag}>
                    <Text style={styles.specialtyText}>Autoestima</Text>
                  </View>
                  <View style={styles.specialtyTag}>
                    <Text style={styles.specialtyText}>Mindfulness</Text>
                  </View>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>⭐ Valoraciones</Text>
                <View style={styles.card}>
                  <Text style={styles.ratingText}>★★★★★ 4.9 (234 reseñas)</Text>
                  <Text style={styles.reviewText}>"Excelente profesional, me ayudó mucho con mi ansiedad"</Text>
                  <Text style={styles.reviewText}>"Muy empático y con grandes herramientas terapéuticas"</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.contactButton}>
                <LinearGradient
                  colors={['#8b5cf6', '#6d28d9']}
                  style={styles.contactGradient}
                >
                  <Text style={styles.contactButtonText}>Agendar Sesión</Text>
                </LinearGradient>
              </TouchableOpacity>
            </ScrollView>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
}

// Componente de Trastornos de Ansiedad
function AnxietyDisorders({ visible, onClose }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={['#1a1a1e', '#0f0f13']}
            style={styles.modalGradient}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Trastornos de Ansiedad</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.infoContainer}>
                <Text style={styles.infoText}>
                  La ansiedad es una respuesta natural del cuerpo ante situaciones de estrés o peligro. 
                  Sin embargo, cuando se vuelve persistente e interfiere con la vida diaria, puede 
                  convertirse en un trastorno que requiere atención profesional.
                </Text>
              </View>

              {/* Tipos de Trastornos */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>🔍 Tipos de Trastornos de Ansiedad</Text>
                
                <View style={styles.disorderCard}>
                  <Text style={styles.disorderTitle}>Trastorno de Ansiedad Generalizada (TAG)</Text>
                  <Text style={styles.disorderDescription}>
                    Preocupación excesiva y persistente sobre diversos aspectos de la vida diaria 
                    durante al menos 6 meses.
                  </Text>
                  <Text style={styles.symptomTitle}>Síntomas comunes:</Text>
                  <Text style={styles.symptomText}>• Inquietud o sensación de nerviosismo</Text>
                  <Text style={styles.symptomText}>• Fatiga fácil</Text>
                  <Text style={styles.symptomText}>• Dificultad para concentrarse</Text>
                  <Text style={styles.symptomText}>• Irritabilidad</Text>
                </View>

                <View style={styles.disorderCard}>
                  <Text style={styles.disorderTitle}>Trastorno de Pánico</Text>
                  <Text style={styles.disorderDescription}>
                    Ataques de pánico repentinos e intensos acompañados de miedo a futuros ataques.
                  </Text>
                  <Text style={styles.symptomTitle}>Síntomas comunes:</Text>
                  <Text style={styles.symptomText}>• Palpitaciones aceleradas</Text>
                  <Text style={styles.symptomText}>• Sudoración y temblores</Text>
                  <Text style={styles.symptomText}>• Sensación de ahogo</Text>
                  <Text style={styles.symptomText}>• Miedo a perder el control</Text>
                </View>

                <View style={styles.disorderCard}>
                  <Text style={styles.disorderTitle}>Fobia Social</Text>
                  <Text style={styles.disorderDescription}>
                    Miedo intenso a situaciones sociales donde la persona pueda ser juzgada o evaluada.
                  </Text>
                  <Text style={styles.symptomTitle}>Síntomas comunes:</Text>
                  <Text style={styles.symptomText}>• Miedo a hablar en público</Text>
                  <Text style={styles.symptomText}>• Evitar interacciones sociales</Text>
                  <Text style={styles.symptomText}>• Vergüenza extrema</Text>
                  <Text style={styles.symptomText}>• Ruborizarse o temblar</Text>
                </View>
              </View>

              {/* Consejos para manejar ansiedad */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>💡 Estrategias de Manejo</Text>
                <View style={styles.tipCard}>
                  <Text style={styles.tipTitle}>🌬️ Respiración profunda</Text>
                  <Text style={styles.tipText}>Inhala por 4 segundos, mantén por 4, exhala por 4</Text>
                </View>
                <View style={styles.tipCard}>
                  <Text style={styles.tipTitle}>🧘 Mindfulness</Text>
                  <Text style={styles.tipText}>Concéntrate en el momento presente sin juzgar</Text>
                </View>
                <View style={styles.tipCard}>
                  <Text style={styles.tipTitle}>🏃 Ejercicio regular</Text>
                  <Text style={styles.tipText}>30 minutos de actividad física al día</Text>
                </View>
                <View style={styles.tipCard}>
                  <Text style={styles.tipTitle}>😴 Higiene del sueño</Text>
                  <Text style={styles.tipText}>7-8 horas de sueño y horarios regulares</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.helpButton}>
                <LinearGradient
                  colors={['#10b981', '#059669']}
                  style={styles.helpGradient}
                >
                  <Text style={styles.helpButtonText}>¿Necesitas ayuda profesional?</Text>
                </LinearGradient>
              </TouchableOpacity>
            </ScrollView>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
}

// Componente principal de Chat
export function ChatInterface({ mensajes, nuevoMensaje, setNuevoMensaje, cargando, enviarMensaje }) {
  const flatListRef = useRef();
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [anxietyModalVisible, setAnxietyModalVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const renderItem = ({ item, index }) => {
    const esBot = item.emisor === 'bot';
    const animationDelay = index * 100;
    
    return (
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <View style={[styles.bubbleContainer, esBot ? styles.alignLeft : styles.alignRight]}>
          {esBot && (
            <TouchableOpacity 
              style={styles.botAvatar}
              onPress={() => setProfileModalVisible(true)}
            >
              <Text style={styles.botAvatarText}>🧠</Text>
            </TouchableOpacity>
          )}
          <View style={[styles.bubble, esBot ? styles.botBubble : styles.userBubble]}>
            <Text style={[styles.messageText, esBot ? styles.botText : styles.userText]}>
              {item.texto}
            </Text>
            <Text style={styles.timestamp}>
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.container}
      >
        {/* Encabezado mejorado */}
        <LinearGradient
          colors={['#1a1a1e', '#131316']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={styles.avatarContainer}
              onPress={() => setProfileModalVisible(true)}
            >
              <LinearGradient
                colors={['#8b5cf6', '#6d28d9']}
                style={styles.avatarGradient}
              >
                <Text style={styles.avatarIcon}>🧠</Text>
              </LinearGradient>
              <View style={styles.onlineIndicator} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.headerText}
              onPress={() => setProfileModalVisible(true)}
            >
              <Text style={styles.title}>MenteSana AI</Text>
              <Text style={styles.status}>● En línea • Psicólogo disponible</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.infoButton}
              onPress={() => setAnxietyModalVisible(true)}
            >
              <Text style={styles.infoButtonText}>ℹ️</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Banner informativo de ansiedad */}
        <TouchableOpacity 
          style={styles.infoBanner}
          onPress={() => setAnxietyModalVisible(true)}
        >
          <LinearGradient
            colors={['#8b5cf620', '#6d28d920']}
            style={styles.bannerGradient}
          >
            <Text style={styles.bannerText}>
              📚 Información sobre Trastornos de Ansiedad - Toca para más detalles
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Historial de conversación */}
        <FlatList
          ref={flatListRef}
          data={mensajes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          showsVerticalScrollIndicator={false}
        />

        {/* Indicador de carga animado */}
        {cargando && (
          <View style={styles.typingContainer}>
            <View style={styles.typingBubble}>
              <View style={styles.typingDot} />
              <View style={[styles.typingDot, styles.typingDotDelay]} />
              <View style={[styles.typingDot, styles.typingDotDelay2]} />
            </View>
            <Text style={styles.typingText}>MenteSana está escribiendo...</Text>
          </View>
        )}

        {/* Entrada de texto mejorada */}
        <View style={styles.inputWrapper}>
          <LinearGradient
            colors={['#202024', '#1a1a1e']}
            style={styles.inputContainer}
          >
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder={cargando ? "MenteSana está respondiendo..." : "Describe cómo te sientes hoy..."}
                placeholderTextColor="#6b7280"
                value={nuevoMensaje}
                onChangeText={setNuevoMensaje}
                multiline
                editable={!cargando}
              />
              <TouchableOpacity 
                style={[styles.sendButton, (!nuevoMensaje.trim() || cargando) && styles.sendButtonDisabled]} 
                onPress={enviarMensaje}
                disabled={!nuevoMensaje.trim() || cargando}
              >
                <LinearGradient
                  colors={['#8b5cf6', '#6d28d9']}
                  style={styles.sendGradient}
                >
                  <Text style={styles.sendButtonText}>→</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </KeyboardAvoidingView>

      {/* Modales */}
      <PsychologistProfile 
        visible={profileModalVisible} 
        onClose={() => setProfileModalVisible(false)} 
      />
      <AnxietyDisorders 
        visible={anxietyModalVisible} 
        onClose={() => setAnxietyModalVisible(false)} 
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121214' },
  
  // Header estilos
  header: { 
    paddingTop: Platform.OS === 'ios' ? 50 : 40, 
    paddingBottom: 16, 
    paddingHorizontal: 20, 
    borderBottomWidth: 1, 
    borderBottomColor: 'rgba(139, 92, 246, 0.1)',
  },
  headerContent: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between' 
  },
  avatarContainer: { position: 'relative', marginRight: 12 },
  avatarGradient: { 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  avatarIcon: { fontSize: 26 },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10b981',
    borderWidth: 2,
    borderColor: '#1a1a1e',
  },
  headerText: { flex: 1 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#ffffff' },
  status: { fontSize: 11, color: '#10b981', marginTop: 2 },
  infoButton: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  infoButtonText: { fontSize: 22 },
  
  // Banner informativo
  infoBanner: { marginHorizontal: 16, marginTop: 12, marginBottom: 4 },
  bannerGradient: { 
    padding: 12, 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: '#8b5cf630' 
  },
  bannerText: { color: '#c4b5fd', fontSize: 12, textAlign: 'center' },
  
  // Chat estilos
  chatList: { paddingHorizontal: 16, paddingVertical: 20 },
  bubbleContainer: { width: '100%', marginBottom: 16, flexDirection: 'row', alignItems: 'flex-end' },
  alignLeft: { justifyContent: 'flex-start' },
  alignRight: { justifyContent: 'flex-end' },
  botAvatar: { 
    width: 32, 
    height: 32, 
    borderRadius: 16, 
    backgroundColor: '#202024', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#8b5cf6',
  },
  botAvatarText: { fontSize: 16 },
  bubble: { maxWidth: '75%', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 20 },
  botBubble: { backgroundColor: '#202024', borderTopLeftRadius: 4 },
  userBubble: { backgroundColor: '#8b5cf6', borderTopRightRadius: 4 },
  messageText: { fontSize: 15, lineHeight: 20 },
  botText: { color: '#e1e1e6' },
  userText: { color: '#ffffff', fontWeight: '500' },
  timestamp: { fontSize: 10, color: '#9ca3af', marginTop: 6, textAlign: 'right' },
  
  // Indicador de escritura
  typingContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12 },
  typingBubble: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#202024', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 20, marginRight: 12 },
  typingDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#8b5cf6', marginHorizontal: 2, opacity: 0.6 },
  typingDotDelay: { opacity: 0.8 },
  typingDotDelay2: { opacity: 1 },
  typingText: { color: '#9ca3af', fontSize: 13 },
  
  // Input estilos
  inputWrapper: { paddingHorizontal: 16, paddingVertical: 12, borderTopWidth: 1, borderTopColor: 'rgba(139, 92, 246, 0.1)', backgroundColor: '#0f0f13' },
  inputContainer: { borderRadius: 30, backgroundColor: '#202024' },
  inputRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4 },
  input: { flex: 1, color: '#ffffff', fontSize: 15, paddingHorizontal: 8, paddingVertical: 8, maxHeight: 100 },
  sendButton: { marginLeft: 4 },
  sendButtonDisabled: { opacity: 0.5 },
  sendGradient: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  sendButtonText: { color: '#ffffff', fontSize: 20, fontWeight: 'bold' },
  
  // Estilos de modales
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { width: width * 0.9, maxHeight: height * 0.85, backgroundColor: 'transparent', borderRadius: 20, overflow: 'hidden' },
  modalGradient: { flex: 1 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#29292e' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#ffffff' },
  closeButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#202024', alignItems: 'center', justifyContent: 'center' },
  closeButtonText: { fontSize: 20, color: '#ffffff' },
  
  // Perfil psicólogo
  profileAvatarContainer: { alignItems: 'center', padding: 20 },
  profileAvatar: { width: 100, height: 100, borderRadius: 50, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  profileAvatarIcon: { fontSize: 50 },
  profileName: { fontSize: 22, fontWeight: 'bold', color: '#ffffff', marginBottom: 4 },
  profileTitle: { fontSize: 14, color: '#8b5cf6', marginBottom: 12 },
  badgeContainer: { flexDirection: 'row', gap: 8, marginTop: 8 },
  badge: { backgroundColor: '#202024', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  badgeText: { color: '#c4b5fd', fontSize: 11 },
  
  // Secciones
  section: { paddingHorizontal: 20, marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#ffffff', marginBottom: 12 },
  card: { backgroundColor: '#202024', padding: 16, borderRadius: 12, marginBottom: 12 },
  cardText: { color: '#e1e1e6', fontSize: 13, marginBottom: 8, lineHeight: 18 },
  specialtiesContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  specialtyTag: { backgroundColor: '#8b5cf620', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#8b5cf6' },
  specialtyText: { color: '#c4b5fd', fontSize: 13 },
  ratingText: { fontSize: 16, color: '#fbbf24', marginBottom: 8 },
  reviewText: { color: '#9ca3af', fontSize: 12, marginBottom: 6, fontStyle: 'italic' },
  contactButton: { marginHorizontal: 20, marginBottom: 20 },
  contactGradient: { paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  contactButtonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  
  // Trastornos ansiedad
  infoContainer: { margin: 20, padding: 16, backgroundColor: '#202024', borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#8b5cf6' },
  infoText: { color: '#e1e1e6', fontSize: 14, lineHeight: 20 },
  disorderCard: { backgroundColor: '#202024', padding: 16, borderRadius: 12, marginBottom: 12 },
  disorderTitle: { fontSize: 16, fontWeight: 'bold', color: '#8b5cf6', marginBottom: 8 },
  disorderDescription: { color: '#e1e1e6', fontSize: 13, marginBottom: 12, lineHeight: 18 },
  symptomTitle: { fontSize: 14, fontWeight: 'bold', color: '#ffffff', marginBottom: 6 },
  symptomText: { color: '#9ca3af', fontSize: 12, marginBottom: 4, marginLeft: 12 },
  tipCard: { backgroundColor: '#202024', padding: 16, borderRadius: 12, marginBottom: 8 },
  tipTitle: { fontSize: 15, fontWeight: 'bold', color: '#10b981', marginBottom: 4 },
  tipText: { color: '#9ca3af', fontSize: 13 },
  helpButton: { marginHorizontal: 20, marginBottom: 20 },
  helpGradient: { paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  helpButtonText: { color: '#ffffff', fontSize: 15, fontWeight: 'bold' },
});
