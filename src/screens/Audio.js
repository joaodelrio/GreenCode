import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

const AudioApp = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [recording, setRecording] = useState(null);
    const [sound, setSound] = useState(null);

    useEffect(() => {
        Audio.requestPermissionsAsync();
    }, []);

    const startRecording = async () => {
        try {
            setIsRecording(true);
            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
            setRecording(recording);
        } catch (error) {
            console.error('Failed to start recording', error);
        }
    };

    const stopRecording = async () => {
        try {
            setIsRecording(false);
            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();
            console.log('Recording URI:', uri);
            await saveRecording(uri);
        } catch (error) {
            console.error('Failed to stop recording', error);
        }
    };

    const saveRecording = async (uri) => {
        const albumDirectory = `${FileSystem.documentDirectory}GreenCodeAudio/`;
        await FileSystem.makeDirectoryAsync(albumDirectory, { intermediates: true });
        const newPath = `${albumDirectory}test.mp3`;
        await FileSystem.moveAsync({ from: uri, to: newPath });
        console.log('Recording saved to:', newPath);
    };

    const playRecording = async () => {
        try {
            const { sound } = await Audio.Sound.createAsync({ uri: `${FileSystem.documentDirectory}GreenCodeAudio/test.mp3` });
            setSound(sound);
            console.log(`${FileSystem.documentDirectory}GreenCodeAudio/test.mp3`);
            await sound.playAsync();
            setIsPlaying(true);
        } catch (error) {
            console.error('Failed to play recording', error);
        }
    };

    const stopPlayback = async () => {
        try {
            await sound.stopAsync();
            setIsPlaying(false);
        } catch (error) {
            console.error('Failed to stop playback', error);
        }
    };

    return (
        <View>
            <Text>Gravador de Áudio</Text>
            {isRecording ? (
                <Button title="Parar Gravação" onPress={stopRecording} />
            ) : (
                <Button title="Iniciar Gravação" onPress={startRecording} />
            )}
            {isPlaying ? (
                <Button title="Parar Reprodução" onPress={stopPlayback} />
            ) : (
                <Button title="Reproduzir Gravação" onPress={playRecording} />
            )}
        </View>
    );
};

export default AudioApp;
