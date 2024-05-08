import React, {useEffect, useState, useCallback} from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useVoiceRecognition } from '../hooks/useVoiceRecognition';



export default function Home({navigation}) {

    const { state, startRecognizing, stopRecognizing, destroyRecognizer  } = useVoiceRecognition();
    const [borderColor, setBorderColor] = useState('black');
    const [textColor, setTextColor] = useState('red');

    return (
        <View class = "bg-main-black" style={styles.container}>
            <View style={styles.discurso }>
                <Text>Texto reconhecido:</Text>
                <Text>{JSON.stringify(state,null, 2)}</Text>
                {/* <Text>{state.results[0]}</Text> */}
            </View>
            <View style={styles.containerBotao}>
                <Pressable
                    onPressIn={() => {
                        setBorderColor('green');
                        setTextColor('green');
                        startRecognizing();
                    }} onPressOut={() => {
                        setBorderColor('black');
                        setTextColor('red');
                        stopRecognizing();
                    }}
                    style={{
                        padding: 20,
                        borderColor: borderColor,
                        borderRadius: 5,
                        borderWidth: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: "95%",
                        
                    }} >
                        <Text style={{color: textColor}}>Grava voz</Text>
                </Pressable>
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 24,
        justifyContent: 'flex-end',
    },
    discurso: {
        flex: 1,
        alignContent:'center', 
    },
    containerBotao: {
        flex:1,
    },
    botao: {
        textAlign: 'center',
        margin: 20,
        padding: 13,
        backgroundColor: '#1E3C40',
        alignContent: 'center',
        borderRadius: 9,
    },
});
