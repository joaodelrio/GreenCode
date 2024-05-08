import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Button, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import audio from "../../assets/audio2.m4a";

export default function Chat() {

    const [messages, setMessages] = useState( [
        { id: 1, sender: 'Bot', content: 'Olá! Como posso te ajudar?', type: 'text'},
    ]);

    const [isTyping, setIsTyping] = useState(false);

    const [inputText, setInputText] = useState('');

    const [color, setColor] = useState("white");

    const [sizeRecord, setSizeRecord] = useState(30);

    const [isRecording, setIsRecording] = useState(false);

    const [recording, setRecording] = useState(null);

    const [sound, setSound] = useState(null);

    const [isPlaying, setIsPlaying] = useState(false);

    const generateRandomId = () => {
      return Math.floor(Math.random() * 1000000); // Gera um número aleatório entre 0 e 999999
    };

    const renderItem = ({ item }) => {
        if(item.type === 'text'){
          return (
              <View style={styles.message}>
                  <Text style={styles.sender}>{item.sender}:</Text>
                  <Text style={styles.content}>{item.content}</Text>
              </View>
          );
        }
        if(item.type === 'audio'){
          return (
              <View style={styles.message}>
                  <Text style={styles.sender}>{item.sender}:</Text>
                  <Pressable style={styles.audioButton} onPress={() => playRecording(item.content)}>
                        <MaterialIcons name="play-circle" size={24} color="white" />
                  </Pressable>
              </View>
          );
        }
    };

    const handleAudioRecord = async () => {
        // Adicione a lógica de gravação de áudio aqui
        setIsRecording(true);
        setSizeRecord(50);
        console.log("Gravação de áudio iniciada");
        try {
          setIsRecording(true);
          const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY);
          setRecording(recording);

        } catch (error) {
            console.error('Failed to start recording', error);
        }
    };

    const handleAudioStopRecord = async () => {
        // Adicione a lógica de parada de gravação de áudio aqui
        setIsRecording(false);
        setSizeRecord(24);
        console.log("Gravação de áudio parada");
        try {
          setIsRecording(false);
          await recording.stopAndUnloadAsync();
          const uri = recording.getURI();
          console.log('Recording URI:', uri);
          const newPath = await saveRecording(uri);
          const newAudio = {
            id: generateRandomId(),
            sender: "User",
            content: newPath,
            type: "audio",
          };
          setMessages([...messages,newAudio]);


      } catch (error) {
          console.error('Failed to stop recording', error);
      }
    };

    const saveRecording = async (uri) => {
      const albumDirectory = `${FileSystem.documentDirectory}GreenCodeAudio/`;
      await FileSystem.makeDirectoryAsync(albumDirectory, { intermediates: true });
      // pega a data e a hora atual
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      // cria o nome do arquivo
      const fileName = `${day}-${month}-${year}_${hours}-${minutes}-${seconds}.m4a`;
      const newPath = `${albumDirectory}` + fileName;
      await FileSystem.moveAsync({ from: uri, to: newPath });
      console.log('Recording saved to:', newPath);
      return newPath;
    };

    const playRecording = async (uri) => {
      try {
          const { sound } = await Audio.Sound.createAsync({ uri: uri });
          setSound(sound);
          console.log("Playing: "+uri);
          await sound.playAsync();
          setIsPlaying(true);
      } catch (error) {
          console.error('Failed to play recording', error);
      }
    };

    const handleAutomaticResponse = (userMessage) => {
        // Lógica para gerar uma resposta automática com base na mensagem do usuário
        let response = "";
    
        // Verifica a mensagem do usuário e gera uma resposta correspondente
        if (userMessage.toLowerCase().includes("quantidade")) {
            if(userMessage.match(/\d+/g)==null){
                response = "Desculpe, não entendi. Poderia informar a quantidade?";
            } else if(userMessage.match(/kg/g)==null){
                response = "Desculpe, não entendi. Poderia informar a unidade de medida da quantidade? [kg, Ton, lt, Un]";
            } else {
              response = "Pela sua mensagem, foi entendido as seguintes informações:\nQuantidade:" + userMessage.match(/\d+/g) + userMessage.match(/kg/g) + ";";
            }
        } else if (userMessage.toLowerCase().includes("ajuda")) {
            response = "Claro! Como posso te ajudar?";
        } else {
            response = "Desculpe, não entendi. Posso te ajudar com algo mais?";
        }
    
        return response;
    };

    const handleSend = () => {
      setIsTyping(false);
      if (inputText.trim() === "") {
          // Se a mensagem estiver em branco, não faz nada
          console.log("Vazio")
          return;
      }

      const newMessage = {
          id: generateRandomId(),
          sender: 'User', // Ou qualquer outra identificação do remetente
          content: inputText,
          type: 'text',
      };

      console.log(messages)

      // Lógica adicional: enviar mensagem para o servidor, etc.

      // Gera uma resposta automática com base na mensagem do usuário
      const autoResponse = handleAutomaticResponse(inputText);

      const botMessage = {
          id: generateRandomId(), // ou qualquer outra lógica para gerar um ID único
          sender: 'Bot',
          content: autoResponse,
          type: 'text',
      };

      // Adiciona a resposta automática ao array de mensagens
      setMessages([...messages, newMessage,botMessage]);

      console.log(messages)

      // Limpa o campo de entrada após o envio da mensagem
      setInputText('');
    };

    const handleClear = () => {
        setMessages([]);
        console.log("Mensagens apagadas");
    };

    return ( 
        <View style={styles.container}>

          {/* Header  */}
          <View style={styles.header}>
            <Text style={styles.headerText}>GreenCode</Text>
            <Button title="Clear" styles={{justifySelf: "right"}} onPress={handleClear} />
          </View>

          {/* Lista de mensagens */}
          <FlatList
            data={messages}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            style={styles.messages}
            // inverted // Inverte a ordem das mensagens para exibir as mais recentes no topo
          />

          {/* Campo de entrada de texto */}
          <View style={styles.inputContainer}>
              { !isRecording &&
                <>
                  <TextInput style={styles.input} placeholder="Digite sua mensagem..." 
                    onChangeText={newText  => {setInputText(newText); if(newText!=''){setIsTyping(true)} else{setIsTyping(false)};}} 
                    defaultValue={inputText} />
                </>
              }
              { isRecording && 
                <>
                  <View style={{width: "80%", flexDirection: "row", alignItems: "center", marginLeft: 20}}>
                    <MaterialIcons name="keyboard-voice" size={24} color="red" />
                    <Text style={{fontSize: 19, marginLeft:7, fontWeight: "bold"}}>Gravando...</Text>
                  </View>
                </> 
              }
              { isTyping &&
                <>
                  <Pressable style={styles.audioButton} onPress={handleSend}>
                        <MaterialIcons name="send" size={25} color="white" />
                  </Pressable>
                </>
              }
              { !isTyping &&
                <>
                  {/* Botão de gravação de áudio */}
                  <Pressable style={styles.audioButton} onPressIn={handleAudioRecord} onPressOut={handleAudioStopRecord}>
                        <MaterialIcons name="keyboard-voice" size={sizeRecord} color="white" />
                  </Pressable>
                </>
              }
          </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      backgroundColor: '#075e54',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',  
    },
    headerText: {
      color: '#fff',
      fontSize: 20,
    },
    messages: {
      flex: 1,
      padding: 10,
    },
    message: {
      marginBottom: 10,
    },
    sender: {
      fontWeight: 'bold',
    },
    content: {
      fontSize: 16,
    },
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: '#ccc',
      padding: 10,
    },
    input: {
      flex: 1,
      padding: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginRight: 10,
    },
    sendButton: {
      backgroundColor: '#075e54',
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 5,
    },
    sendButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    audioButton: {
        marginLeft: 2,
        padding: 7,
        borderRadius: 40,
        backgroundColor: "#075e54",
      },
  });