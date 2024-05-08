import { StyleSheet, Text, TextInput, View, Image, Pressable} from "react-native";
import { useState } from "react";

export default function Login({navigation}){

    const [cellphoneNumber, setCellphoneNumber] = useState(undefined)

    const [hasLessThanDigitsError, setHasThanDigitsError] = useState(false)

    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#1E1E1E",
            flex:1,
            padding: 24,
            justifyContent: 'center',
            alignItems: 'center'
        },
        welcomeView:{
            display:'flex',
            flexDirection:'column',
            marginBottom: 50,
            justifyContent: 'center'

        },
        welcomeText:{
            width: '100%',
            color:"#fff",
            fontSize: 40,
            fontFamily: 'Sora_Semibold',
            textAlign: 'center'
        },
        welcomeImage:{
            marginLeft: 12,
            width: 200,
            height: 175,
            marginBottom: '57px'
        },
        loginView:{
            width: '100%',
        },
        loginText:{
            marginBottom: 8,
            fontSize: 18,
            fontFamily: 'Sora_Semibold',
            textAlign: 'left'
        },
        loginTextColor:{ 
            color:"#19B729",
        },
        loginTextColorErrored:{ 
            color:"#F23131",
        },
        loginInput:{
            marginBottom: 22,
            paddingLeft: 15,
            height: 60,
            color: '#fff',
            fontSize: 18,
            fontFamily: 'Sora_Semibold',
            textAlign: 'left',
            borderColor: '#1F9F2B',
            borderWidth: 2,
            borderRadius: 6
        },
        loginInputColor:{ 
            borderColor: '#1F9F2B',
        },
        loginInputColorErrored:{ 
            borderColor: '#F23131',
        },
        loginButton:{
            backgroundColor:"#19B729",
            height: 60,
            borderRadius: 6,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        disableLoginButtonColor:{
            backgroundColor:"#595C5C",
        },
        enableLoginButtonColor:{
            backgroundColor:"#19B729",
        },
        loginButtonText:{
            color:"#fff",
            textAlign: 'center',
            fontSize: 18,
            fontFamily: 'Sora_Semibold',
            textTransform: 'uppercase'
        }
    })

    const sendSMS = () => {
        if(cellphoneNumber.split('').length < 10){
            setHasThanDigitsError(true)
        }else{
            navigation.navigate('SMSConfirm');  
        }
    }
    
    return(
        <View style={styles.container}>
            <View style={styles.welcomeView}>
                <Image
                style={styles.welcomeImage}
                source={require('../../assets/green-symbol.png')}
                />
                <Text style={styles.welcomeText}>Bem vindo</Text>
            </View>
            <View style={styles.loginView}>
                <Text style={[styles.loginText,
                    hasLessThanDigitsError ? styles.loginTextColorErrored : styles.loginTextColor
                ]}>
                    {hasLessThanDigitsError ? 'Número de contato inválido': 'Número de contato'}</Text>
                <TextInput
                keyboardType="numeric"
                onChangeText={event=> setCellphoneNumber(event)}
                style={[styles.loginInput, 
                    hasLessThanDigitsError ? styles.loginInputColorErrored : styles.loginInputColor
                ]}
                placeholder="(99) 99999-9999"
                placeholderTextColor="#96B298" 
                ></TextInput>
                <Pressable
                disabled= {cellphoneNumber === undefined}
                onPress={sendSMS}
                style={[styles.loginButton, cellphoneNumber === undefined ? styles.disableLoginButtonColor : styles.enableLoginButtonColor]}
                >
                    <Text
                    style={styles.loginButtonText}
                    >Enviar SMS</Text>
                </Pressable>
            </View>
            
        </View>
    )
}