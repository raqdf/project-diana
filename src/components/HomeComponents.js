import React, { useRef, useState, useEffect } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  FlatList, KeyboardAvoidingView, Platform, ActivityIndicator, 
  Modal, ScrollView, Dimensions, Image, Linking 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { WebView } from 'react-native-webview';

const { width, height } = Dimensions.get('window');

// ✅ RESPONSIVO: Detectar si es tablet o móvil
const isTablet = width >= 768;
const isWeb = Platform.OS === 'web';

const FOTO_PERFIL_URL = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop';

// ==========================================
// REPRODUCTOR EN VENTANA MODAL RESPONSIVO
// ==========================================
function MusicPlayerModal({ visible, onClose }) {
  const PLAYLIST_URL = 'https://www.youtube.com/embed/videoseries?list=PLDF2E3F105D56FCE6&autoplay=1&loop=1';

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={playerStyles.modalContainer}>
        <LinearGradient colors={['#1a1a1e', '#0f0f13']} style={playerStyles.modalGradient}>
          <View style={playerStyles.modalHeader}>
            <Text style={playerStyles.modalTitle}>🎵 Machinarium Soundtrack</Text>
            <TouchableOpacity onPress={onClose} style={playerStyles.closeButton}>
              <Text style={playerStyles.closeButtonText}>✕ Cerrar</Text>
            </TouchableOpacity>
          </View>

          <View style={playerStyles.playerContainer}>
            {isWeb ? (
              <iframe
                src={PLAYLIST_URL}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: isTablet ? 24 : 16,
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <WebView
                source={{ uri: PLAYLIST_URL }}
                allowsInlineMediaPlayback={true}
                mediaPlaybackRequiresUserAction={false}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                style={playerStyles.webview}
              />
            )}
          </View>

          <View style={playerStyles.infoContainer}>
            <Text style={playerStyles.infoTitle}>🎹 Música Relajante para tu bienestar</Text>
            <Text style={playerStyles.infoText}>
              Disfruta de la banda sonora de Machinarium mientras conversas con Diana.
              Esta música fue compuesta por Tomas Dvorak y es ideal para reducir la ansiedad.
            </Text>
          </View>

          <TouchableOpacity style={playerStyles.backButton} onPress={onClose}>
            <LinearGradient colors={['#8b5cf6', '#6d28d9']} style={playerStyles.backGradient}>
              <Text style={playerStyles.backButtonText}>Volver al chat</Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </Modal>
  );
}

// ==========================================
// COMPONENTE 1: Perfil del Psicólogo (Modal)
// ==========================================
function PsychologistProfile({ visible, onClose }) {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={modalStyles.modalOverlay}>
        <View style={[modalStyles.modalContainer, isTablet && modalStyles.modalContainerTablet]}>
          <LinearGradient colors={['#1a1a1e', '#0f0f13']} style={modalStyles.modalGradient}>
            <View style={modalStyles.modalHeader}>
              <Text style={modalStyles.modalTitle}>Perfil del Psicólogo</Text>
              <TouchableOpacity onPress={onClose} style={modalStyles.closeButton}>
                <Text style={modalStyles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={modalStyles.profileAvatarContainer}>
                <LinearGradient colors={['#8b5cf6', '#6d28d9']} style={modalStyles.profileAvatar}>
                  <Image 
                    source={{ uri: FOTO_PERFIL_URL }} 
                    style={modalStyles.profileAvatarImage}
                    resizeMode="cover"
                  />
                </LinearGradient>
                <Text style={modalStyles.profileName}>Dra. Diana</Text>
                <Text style={modalStyles.profileTitle}>Psicóloga Clínica Especialista</Text>
                <View style={modalStyles.badgeContainer}>
                  <View style={modalStyles.badge}><Text style={modalStyles.badgeText}>Colegiado: PS-45892</Text></View>
                  <View style={modalStyles.badge}><Text style={modalStyles.badgeText}>10+ años experiencia</Text></View>
                </View>
              </View>

              <View style={modalStyles.section}>
                <Text style={modalStyles.sectionTitle}>🎓 Formación Académica</Text>
                <View style={modalStyles.card}>
                  <Text style={modalStyles.cardText}>• Doctorado en Psicología Clínica - Universidad de Barcelona</Text>
                  <Text style={modalStyles.cardText}>• Máster en Terapia Cognitivo-Conductual</Text>
                  <Text style={modalStyles.cardText}>• Especialización en Trastornos de Ansiedad</Text>
                </View>
              </View>

              <View style={modalStyles.section}>
                <Text style={modalStyles.sectionTitle}>💼 Experiencia Profesional</Text>
                <View style={modalStyles.card}>
                  <Text style={modalStyles.cardText}>• Directora clínica en Centro de Salud Mental "ALKA"</Text>
                  <Text style={modalStyles.cardText}>• Investigadora en terapias digitales para salud mental</Text>
                </View>
              </View>

              <View style={modalStyles.section}>
                <Text style={modalStyles.sectionTitle}>🏆 Especialidades</Text>
                <View style={modalStyles.specialtiesContainer}>
                  <View style={modalStyles.specialtyTag}><Text style={modalStyles.specialtyText}>Ansiedad</Text></View>
                  <View style={modalStyles.specialtyTag}><Text style={modalStyles.specialtyText}>Estrés</Text></View>
                  <View style={modalStyles.specialtyTag}><Text style={modalStyles.specialtyText}>Mindfulness</Text></View>
                </View>
              </View>

              <TouchableOpacity style={modalStyles.contactButton}>
                <LinearGradient colors={['#8b5cf6', '#6d28d9']} style={modalStyles.contactGradient}>
                  <Text style={modalStyles.contactButtonText}>Agendar Sesión</Text>
                </LinearGradient>
              </TouchableOpacity>
            </ScrollView>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
}

// ==========================================
// COMPONENTE 2: Trastornos de Ansiedad (Modal)
// ==========================================
function AnxietyDisorders({ visible, onClose }) {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={modalStyles.modalOverlay}>
        <View style={[modalStyles.modalContainer, isTablet && modalStyles.modalContainerTablet]}>
          <LinearGradient colors={['#1a1a1e', '#0f0f13']} style={modalStyles.modalGradient}>
            <View style={modalStyles.modalHeader}>
              <Text style={modalStyles.modalTitle}>Trastornos de Ansiedad</Text>
              <TouchableOpacity onPress={onClose} style={modalStyles.closeButton}>
                <Text style={modalStyles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={modalStyles.infoContainer}>
                <Text style={modalStyles.infoText}>
                  La ansiedad es una respuesta natural del cuerpo ante situaciones de estrés. Sin embargo, si es de forma persistente, requiere atención profesional.
                </Text>
              </View>

              <View style={modalStyles.section}>
                <Text style={modalStyles.sectionTitle}>🔍 Tipos Comunes</Text>
                <View style={modalStyles.disorderCard}>
                  <Text style={modalStyles.disorderTitle}>Trastorno de Ansiedad Generalizada (TAG)</Text>
                  <Text style={modalStyles.disorderDescription}>Preocupación excesiva y persistentemente sobre la vida diaria.</Text>
                </View>
                <View style={modalStyles.disorderCard}>
                  <Text style={modalStyles.disorderTitle}>Trastorno de Pánico</Text>
                  <Text style={modalStyles.disorderDescription}>Ataques de pánico de golpe acompañados de miedo físico agudo.</Text>
                </View>
              </View>

              <View style={modalStyles.section}>
                <Text style={modalStyles.sectionTitle}>💡 Estrategias Rápidas</Text>
                <View style={modalStyles.tipCard}>
                  <Text style={modalStyles.tipTitle}>🌬️ Respiración profunda</Text>
                  <Text style={modalStyles.tipText}>Inhala por 4 segundos, mantén por 4, exhala por 4.</Text>
                </View>
              </View>

              <TouchableOpacity style={modalStyles.helpButton}>
                <LinearGradient colors={['#10b981', '#059669']} style={modalStyles.helpGradient}>
                  <Text style={modalStyles.helpButtonText}>¿Necesitas ayuda profesional?</Text>
                </LinearGradient>
              </TouchableOpacity>
            </ScrollView>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
}

// ==========================================
// COMPONENTE 3: Interfaz de Chat Principal
// ==========================================
export function ChatInterface({ mensajes, nuevoMensaje, setNuevoMensaje, cargando, enviarMensaje }) {
  const flatListRef = useRef();
  
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [anxietyModalVisible, setAnxietyModalVisible] = useState(false);
  const [musicModalVisible, setMusicModalVisible] = useState(false);

  const renderItem = ({ item }) => {
    const esBot = item.emisor === 'bot';
    return (
      <View style={[styles.bubbleContainer, esBot ? styles.alignLeft : styles.alignRight]}>
        {esBot && (
          <TouchableOpacity style={styles.botAvatarInline} onPress={() => setProfileModalVisible(true)}>
            <Image source={{ uri: FOTO_PERFIL_URL }} style={styles.avatarImageNative} />
          </TouchableOpacity>
        )}
        <View style={[styles.bubble, esBot ? styles.botBubble : styles.userBubble]}>
          <Text style={[styles.messageText, esBot ? styles.botText : styles.userText]}>
            {item.texto}
          </Text>
        </View>
      </View>
    );
  };

  const handleSubmit = () => {
    if (!cargando && nuevoMensaje.trim().length > 0) {
      enviarMensaje();
    }
  };

  return (
    <>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.container}
      >
        {/* Header Responsivo */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerCenter} onPress={() => setProfileModalVisible(true)} activeOpacity={0.8}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: FOTO_PERFIL_URL }} style={styles.avatarImageNative} />
            </View>
            <View>
              <Text style={styles.title}>DIANA</Text>
              <Text style={styles.status}>• En línea •</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.infoButtonHeader} onPress={() => setAnxietyModalVisible(true)}>
            <Text style={styles.infoButtonHeaderText}>ℹ️</Text>
          </TouchableOpacity>
        </View>

        {/* Banner Informativo Responsivo */}
        <TouchableOpacity style={styles.infoBanner} onPress={() => setAnxietyModalVisible(true)}>
          <LinearGradient colors={['#8b5cf620', '#6d28d920']} style={styles.bannerGradient}>
            <Text style={styles.bannerText}>📚 Información sobre Trastornos de Ansiedad - Ver más</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Botón Música Responsivo */}
        <TouchableOpacity style={styles.musicButton} onPress={() => setMusicModalVisible(true)}>
          <LinearGradient colors={['#1e1b4b', '#111026']} style={styles.musicButtonGradient}>
            <Text style={styles.musicButtonIcon}>🎵</Text>
            <Text style={styles.musicButtonText}>Escuchar Machinarium OST</Text>
            <Text style={styles.musicButtonArrow}>▶</Text>
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
        />

        {cargando && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#8b5cf6" />
            <Text style={styles.loadingText}>Diana está pensando...</Text>
          </View>
        )}

        {/* Input Responsivo */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={cargando ? "Esperando respuesta..." : "Escribe cómo te sientes aquí..."}
            placeholderTextColor="#71717a"
            value={nuevoMensaje}
            onChangeText={setNuevoMensaje}
            editable={!cargando}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            blurOnSubmit={false}
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

      <PsychologistProfile visible={profileModalVisible} onClose={() => setProfileModalVisible(false)} />
      <AnxietyDisorders visible={anxietyModalVisible} onClose={() => setAnxietyModalVisible(false)} />
      <MusicPlayerModal visible={musicModalVisible} onClose={() => setMusicModalVisible(false)} />
    </>
  );
}

// ==========================================
// ESTILOS RESPONSIVOS
// ==========================================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121214' },
  header: { 
    paddingTop: isWeb ? 20 : 40, 
    paddingBottom: isTablet ? 20 : 15, 
    paddingHorizontal: isTablet ? 40 : 20, 
    backgroundColor: '#1a1a1e', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    borderBottomWidth: 1, 
    borderBottomColor: '#29292e' 
  },
  headerCenter: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  avatarContainer: { width: isTablet ? 50 : 40, height: isTablet ? 50 : 40, borderRadius: isTablet ? 25 : 20, backgroundColor: '#29292e', alignItems: 'center', justifyContent: 'center', marginRight: isTablet ? 15 : 10, overflow: 'hidden' },
  avatarImageNative: { width: '100%', height: '100%', borderRadius: 50 },
  title: { fontSize: isTablet ? 20 : 16, fontWeight: 'bold', color: '#ffffff' },
  status: { fontSize: isTablet ? 12 : 10, color: '#10b981', marginTop: 2 },
  infoButtonHeader: { width: isTablet ? 45 : 40, height: isTablet ? 45 : 40, borderRadius: isTablet ? 22.5 : 20, backgroundColor: '#202024', alignItems: 'center', justifyContent: 'center' },
  infoButtonHeaderText: { fontSize: isTablet ? 20 : 18 },
  infoBanner: { marginHorizontal: isTablet ? 40 : 16, marginTop: isTablet ? 15 : 10, marginBottom: isTablet ? 10 : 5 },
  bannerGradient: { padding: isTablet ? 14 : 10, borderRadius: isTablet ? 16 : 12, borderWidth: 1, borderColor: '#8b5cf630' },
  bannerText: { color: '#c4b5fd', fontSize: isTablet ? 14 : 12, textAlign: 'center' },
  
  musicButton: { marginHorizontal: isTablet ? 40 : 16, marginTop: isTablet ? 12 : 8, marginBottom: isTablet ? 8 : 4 },
  musicButtonGradient: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    padding: isTablet ? 14 : 10, 
    borderRadius: isTablet ? 16 : 12, 
    borderWidth: 1, 
    borderColor: '#4338ca50' 
  },
  musicButtonIcon: { fontSize: isTablet ? 22 : 18 },
  musicButtonText: { fontSize: isTablet ? 14 : 12, color: '#ffffff', fontWeight: '500', flex: 1, marginLeft: isTablet ? 12 : 10 },
  musicButtonArrow: { fontSize: isTablet ? 16 : 14, color: '#8b5cf6' },

  chatList: { paddingHorizontal: isTablet ? 40 : 16, paddingVertical: isTablet ? 30 : 20, paddingBottom: isTablet ? 100 : 80 },
  bubbleContainer: { width: '100%', marginBottom: isTablet ? 18 : 14, flexDirection: 'row', alignItems: 'flex-end' },
  alignLeft: { justifyContent: 'flex-start' },
  alignRight: { justifyContent: 'flex-end' },
  botAvatarInline: { width: isTablet ? 34 : 28, height: isTablet ? 34 : 28, borderRadius: isTablet ? 17 : 14, backgroundColor: '#202024', alignItems: 'center', justifyContent: 'center', marginRight: isTablet ? 12 : 8, borderWidth: 1, borderColor: '#8b5cf630', overflow: 'hidden' },
  bubble: { maxWidth: isTablet ? '70%' : '80%', paddingHorizontal: isTablet ? 20 : 16, paddingVertical: isTablet ? 14 : 12, borderRadius: isTablet ? 20 : 16 },
  botBubble: { backgroundColor: '#202024', borderTopLeftRadius: isTablet ? 6 : 4 },
  userBubble: { backgroundColor: '#8b5cf6', borderTopRightRadius: isTablet ? 6 : 4 },
  messageText: { fontSize: isTablet ? 16 : 15, lineHeight: isTablet ? 22 : 20 },
  botText: { color: '#e1e1e6' },
  userText: { color: '#ffffff', fontWeight: '500' },
  loadingContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: isTablet ? 40 : 20, paddingBottom: isTablet ? 15 : 10 },
  loadingText: { color: '#71717a', fontSize: isTablet ? 14 : 13, marginLeft: 8 },
  inputContainer: { flexDirection: 'row', paddingHorizontal: isTablet ? 40 : 16, paddingVertical: isTablet ? 16 : 12, backgroundColor: '#1a1a1e', alignItems: 'center', borderTopWidth: 1, borderColor: '#29292e' },
  input: { flex: 1, backgroundColor: '#202024', color: '#ffffff', borderRadius: isTablet ? 28 : 24, paddingHorizontal: isTablet ? 22 : 18, paddingVertical: isTablet ? 14 : 10, fontSize: isTablet ? 16 : 15, maxHeight: isTablet ? 120 : 100, marginRight: isTablet ? 16 : 12 },
  sendButton: { backgroundColor: '#8b5cf6', borderRadius: isTablet ? 28 : 20, paddingHorizontal: isTablet ? 22 : 16, paddingVertical: isTablet ? 14 : 10, justifyContent: 'center', alignItems: 'center' },
  sendButtonDisabled: { backgroundColor: '#4c1d95' },
  sendButtonText: { color: '#ffffff', fontWeight: 'bold', fontSize: isTablet ? 16 : 14 },
});

// Estilos del reproductor modal responsivo
const playerStyles = StyleSheet.create({
  modalContainer: { flex: 1 },
  modalGradient: { flex: 1 },
  modalHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingTop: isWeb ? 20 : 50,
    paddingHorizontal: isTablet ? 40 : 20,
    paddingBottom: isTablet ? 20 : 15,
    borderBottomWidth: 1,
    borderBottomColor: '#29292e'
  },
  modalTitle: { fontSize: isTablet ? 22 : 18, fontWeight: 'bold', color: '#ffffff' },
  closeButton: { padding: isTablet ? 12 : 8 },
  closeButtonText: { color: '#8b5cf6', fontSize: isTablet ? 16 : 14 },
  playerContainer: { flex: isTablet ? 0.6 : 0.5, margin: isTablet ? 40 : 16, borderRadius: isTablet ? 24 : 16, overflow: 'hidden', backgroundColor: '#000' },
  webview: { flex: 1 },
  infoContainer: { padding: isTablet ? 24 : 20, marginHorizontal: isTablet ? 40 : 16, backgroundColor: '#202024', borderRadius: isTablet ? 20 : 16, marginTop: isTablet ? 20 : 10 },
  infoTitle: { fontSize: isTablet ? 18 : 16, fontWeight: 'bold', color: '#c4b5fd', marginBottom: isTablet ? 12 : 8 },
  infoText: { fontSize: isTablet ? 14 : 13, color: '#e1e1e6', lineHeight: isTablet ? 24 : 20 },
  backButton: { margin: isTablet ? 40 : 20, marginTop: isTablet ? 30 : 20 },
  backGradient: { paddingVertical: isTablet ? 16 : 14, borderRadius: isTablet ? 16 : 12, alignItems: 'center' },
  backButtonText: { color: '#ffffff', fontSize: isTablet ? 18 : 16, fontWeight: 'bold' },
});

const modalStyles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { width: width * 0.9, maxHeight: height * 0.85, borderRadius: 20, overflow: 'hidden' },
  modalContainerTablet: { width: width * 0.7, maxHeight: height * 0.8, borderRadius: 24 },
  modalGradient: { flex: 1 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: isTablet ? 24 : 20, borderBottomWidth: 1, borderBottomColor: '#29292e' },
  modalTitle: { fontSize: isTablet ? 22 : 20, fontWeight: 'bold', color: '#ffffff' },
  closeButton: { width: isTablet ? 42 : 36, height: isTablet ? 42 : 36, borderRadius: isTablet ? 21 : 18, backgroundColor: '#202024', alignItems: 'center', justifyContent: 'center' },
  closeButtonText: { fontSize: isTablet ? 20 : 18, color: '#ffffff' },
  profileAvatarContainer: { alignItems: 'center', padding: isTablet ? 30 : 20 },
  profileAvatar: { width: isTablet ? 110 : 90, height: isTablet ? 110 : 90, borderRadius: isTablet ? 55 : 45, alignItems: 'center', justifyContent: 'center', marginBottom: isTablet ? 16 : 12, overflow: 'hidden', padding: 2 },
  profileAvatarImage: { width: '100%', height: '100%', borderRadius: 45 },
  profileName: { fontSize: isTablet ? 26 : 22, fontWeight: 'bold', color: '#ffffff', marginBottom: isTablet ? 6 : 4 },
  profileTitle: { fontSize: isTablet ? 16 : 14, color: '#8b5cf6', marginBottom: isTablet ? 16 : 12 },
  badgeContainer: { flexDirection: 'row', gap: isTablet ? 12 : 8, marginTop: isTablet ? 8 : 4 },
  badge: { backgroundColor: '#202024', paddingHorizontal: isTablet ? 16 : 12, paddingVertical: isTablet ? 8 : 6, borderRadius: isTablet ? 16 : 12 },
  badgeText: { color: '#c4b5fd', fontSize: isTablet ? 13 : 11 },
  section: { paddingHorizontal: isTablet ? 30 : 20, marginBottom: isTablet ? 25 : 20 },
  sectionTitle: { fontSize: isTablet ? 19 : 17, fontWeight: 'bold', color: '#ffffff', marginBottom: isTablet ? 14 : 10 },
  card: { backgroundColor: '#202024', padding: isTablet ? 18 : 14, borderRadius: isTablet ? 16 : 12, marginBottom: isTablet ? 12 : 8 },
  cardText: { color: '#e1e1e6', fontSize: isTablet ? 14 : 13, marginBottom: isTablet ? 8 : 6, lineHeight: isTablet ? 22 : 18 },
  specialtiesContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: isTablet ? 12 : 8 },
  specialtyTag: { backgroundColor: '#8b5cf620', paddingHorizontal: isTablet ? 18 : 14, paddingVertical: isTablet ? 8 : 6, borderRadius: isTablet ? 24 : 20, borderWidth: 1, borderColor: '#8b5cf6' },
  specialtyText: { color: '#c4b5fd', fontSize: isTablet ? 14 : 13 },
  contactButton: { marginHorizontal: isTablet ? 30 : 20, marginBottom: isTablet ? 30 : 20 },
  contactGradient: { paddingVertical: isTablet ? 16 : 14, borderRadius: isTablet ? 16 : 12, alignItems: 'center' },
  contactButtonText: { color: '#ffffff', fontSize: isTablet ? 18 : 16, fontWeight: 'bold' },
  infoContainer: { margin: isTablet ? 30 : 20, padding: isTablet ? 20 : 16, backgroundColor: '#202024', borderRadius: isTablet ? 16 : 12, borderLeftWidth: 4, borderLeftColor: '#8b5cf6' },
  infoText: { color: '#e1e1e6', fontSize: isTablet ? 15 : 14, lineHeight: isTablet ? 24 : 20 },
  disorderCard: { backgroundColor: '#202024', padding: isTablet ? 18 : 14, borderRadius: isTablet ? 16 : 12, marginBottom: isTablet ? 16 : 12 },
  disorderTitle: { fontSize: isTablet ? 17 : 15, fontWeight: 'bold', color: '#8b5cf6', marginBottom: isTablet ? 8 : 6 },
  disorderDescription: { color: '#e1e1e6', fontSize: isTablet ? 14 : 13, marginBottom: isTablet ? 12 : 10, lineHeight: isTablet ? 22 : 18 },
  tipCard: { backgroundColor: '#202024', padding: isTablet ? 16 : 12, borderRadius: isTablet ? 16 : 12, marginBottom: isTablet ? 12 : 8 },
  tipTitle: { fontSize: isTablet ? 16 : 14, fontWeight: 'bold', color: '#10b981', marginBottom: isTablet ? 4 : 2 },
  tipText: { color: '#9ca3af', fontSize: isTablet ? 13 : 12 },
  helpButton: { marginHorizontal: isTablet ? 30 : 20, marginBottom: isTablet ? 30 : 20 },
  helpGradient: { paddingVertical: isTablet ? 16 : 14, borderRadius: isTablet ? 16 : 12, alignItems: 'center' },
  helpButtonText: { color: '#ffffff', fontSize: isTablet ? 17 : 15, fontWeight: 'bold' },
});