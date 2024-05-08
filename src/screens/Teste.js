import React, { useState, useEffect} from 'react';
import { View, Text, Button } from 'react-native';
import { OPENAI_API_KEY } from '../../config-env.js';
import * as FileSystem from 'expo-file-system';


export default function Teste() {
  const [text, setText] = useState('');
  const [error, setError] = useState(null);

  const convertAudioToText = async () => {
    console.log('Convertendo áudio para texto...');
    const uri = await FileSystem.downloadAsync(
      'https://upload.wikimedia.org/wikipedia/commons/1/12/Apollo13-wehaveaproblem_edit_1.ogg',
      FileSystem.documentDirectory + 'test.ogg'
    );
    // const fileUri = uri.uri;
    const fileUri = 'file:///data/user/0/host.exp.exponent/files/GreenCodeAudio/8-5-2024_10-53-35.m4a';
    const file = { uri: fileUri, name: 'test.m4a', type: 'audio/m4a' };
    const formData = new FormData();
    formData.append('model', 'whisper-1');
    formData.append('file', file);
    formData.append('response_format', 'text');
    const res = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        headers: { Authorization: 'Bearer ' + OPENAI_API_KEY, 'Content-Type': 'multipart/form-data' },
        method: 'POST',
        body: formData,
    });
    const text = await res.text();
    setText(text);
    console.log(text)

    // const file = { uri: uriAudio, name: 'teste1.m4a', type: 'audio/m4a' };
    // try {
    //   axios.post('https://api.openai.com/v1/audio/transcriptions', {
    //     file: file,
    //     model: 'whisper-1',
    //   }, {
    //     headers: {
    //       'Authorization': "Bearer " + OPENAI_API_KEY,
    //     },
    //   })
    // } catch (error) {
    //   console.error('Error converting audio to text:', error);
    // }
  
  };
  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Converter Áudio para Texto" onPress={convertAudioToText} />
      {text ? <Text>Texto Convertido: {text}</Text> : null}
      {error ? <Text>Error: {error}</Text> : null}
    </View>
  );
};
