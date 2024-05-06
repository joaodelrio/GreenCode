import React, { useState, useEffect} from 'react';
import { View, Text, Button } from 'react-native';
import openai from 'openai';
import { OPENAI_API_KEY } from '../../config.js';
import * as FileSystem from 'expo-file-system';

export default function Teste() {
  const [text, setText] = useState('');
  const [error, setError] = useState(null);
  const uriAudio = 'file:///storage/emulated/0/Recordings/VoiceRecorder/teste1.m4a';
  // const uriAudio = 'file:///data/user/0/host.exp.exponent/files/GreenCodeAudio/30-4-2024_16-54-49.mp3';

  const findFile = async () => {
    console.log('Procurando arquivo...');
    try {
      const file = await FileSystem.getInfoAsync(uriAudio);
      console.log('File:', file);
    } catch (error) {
      console.error('Error finding file:', error);
    }
  }

  const convertAudioToText = async () => {
    console.log('Convertendo áudio para texto...');
    // try {
      const fileData = await fetch(uriAudio);
      const audioBlob = await fileData.blob();
      
      const formData = new FormData();
      formData.append('file', {
        uri: uriAudio,
      });
      console.log("teste")
      const response = await fetch('localhost:3000', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      console.log(data)
      if (response.ok) {
        setText(data);
        console.log(data);
      } else {
        setError(data.error.message);
        console.error('Error converting audio to text:', data.error.message);
      }
    // } catch (error) {
    //   setError('An error occurred while converting audio to text.');
    //   console.error('Error converting audio to text:', error);
    // }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Converter Áudio para Texto" onPress={convertAudioToText} />
      <Button title="Escolher Arquivo" onPress={findFile} />
      {text ? <Text>Texto Convertido: {text}</Text> : null}
      {error ? <Text>Error: {error}</Text> : null}
    </View>
  );
};
