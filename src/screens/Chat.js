import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getResponse } from '../apiOpenAi/api';

export default function Chat() {


  //ARRUMAR ORDEM DAS MENSAGEM DO BOT ESTAO SENDO ATUALIZADAS ATRASADAS







    const [messages, setMessages] = useState( [
    ]);

    const [response, setResponse] = useState("");

    const [inputText, setInputText] = useState('');

    const generateRandomId = () => {
      return Math.floor(Math.random() * 1000000); // Gera um número aleatório entre 0 e 999999
    };

    const renderItem = ({ item }) => (
        <View style={styles.message}>
          <Text style={styles.sender}>{item.sender}:</Text>
          <Text style={styles.content}>{item.content}</Text>
        </View>
    );

    const handleAudioRecord = () => {
        // Adicione a lógica de gravação de áudio aqui
        console.log("Gravação de áudio iniciada");
      };

      const handleAutomaticResponse = (userMessage) => {

        // Verifica a mensagem do usuário e gera uma resposta correspondente
        if (userMessage.toLowerCase().includes("quantidade")) {
            if(userMessage.match(/\d+/g)==null){
                setResponse("Desculpe, não entendi. Poderia informar a quantidade?")
            } else if(userMessage.match(/kg/g)==null){
                setResponse("Desculpe, não entendi. Poderia informar a unidade de medida da quantidade? [kg, Ton, lt, Un]")
            } else {
              setResponse("Pela sua mensagem, foi entendido as seguintes informações:\nQuantidade:" + userMessage.match(/\d+/g) + userMessage.match(/kg/g) + ";")
            }
        } else if (userMessage.toLowerCase().includes("ajuda")) {
            setResponse("Claro! Como posso te ajudar?")
        } else {
          (async () => {
            try {
              const responseData = await getResponse(inputText)
              console.log("Responsta:" + responseData)
              setResponse(responseData)
            }catch (e) {
              console.log(e.message)
            }
          })();
        }
        return response;
    };

      const handleSend = () => {

        if (inputText.trim() === "") {
            // Se a mensagem estiver em branco, não faz nada
            console.log("Vazio")
            return;
        }

        const newMessage = {
            id: generateRandomId(),
            sender: 'User', // Ou qualquer outra identificação do remetente
            content: inputText,
        };

        // console.log(messages)

        // Lógica adicional: enviar mensagem para o servidor, etc.

        // Gera uma resposta automática com base na mensagem do usuário
        const autoResponse = handleAutomaticResponse(inputText);

        const botMessage = {
            id: generateRandomId(), // ou qualquer outra lógica para gerar um ID único
            sender: 'Bot',
            content: autoResponse,
        };

        // Adiciona a resposta automática ao array de mensagens
        setMessages([...messages, newMessage,botMessage]);

        // console.log(messages)

        // Limpa o campo de entrada após o envio da mensagem
        setInputText('');
    };

    const handleClear = () => {
        setMessages([]);
        console.log("Mensagens apagadas");
    };

    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>GreenCode</Text>
            <Button title="Clear" styles={{justifySelf: "right"}} onPress={handleClear} />
          </View>
          <FlatList
            data={messages}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            style={styles.messages}
            // inverted // Inverte a ordem das mensagens para exibir as mais recentes no topo
          />
          <View style={styles.inputContainer}>
            
            <TextInput style={styles.input} placeholder="Digite sua mensagem..." onChangeText={newText => setInputText(newText)} defaultValue={inputText} />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Text style={styles.sendButtonText}>Enviar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.audioButton} onPress={handleAudioRecord}>
                <MaterialIcons name="keyboard-voice" size={24} color="#075e54" />
            </TouchableOpacity>
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
        borderRadius: 20,
      },
  });