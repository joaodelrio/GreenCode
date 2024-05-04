import { StyleSheet, Text, TextInput, View, Image, Pressable} from "react-native";


export default function SMsConfirm({navigation}){

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
            color:"#19B729",
            fontSize: 18,
            fontFamily: 'Sora_Semibold',
            textAlign: 'left'
        },
        loginInput:{
            marginBottom: 22,
            paddingLeft: 15,
            height: 60,
            fontSize: 18,
            fontFamily: 'Sora_Semibold',
            textAlign: 'left',
            borderColor: '#1F9F2B',
            borderWidth: 2,
            borderRadius: 6
        },
        loginButton:{
            backgroundColor:"#19B729",
            height: 60,
            borderRadius: 6,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        loginButtonText:{
            color:"#fff",
            textAlign: 'center',
            fontSize: 18,
            fontFamily: 'Sora_Semibold',
            textTransform: 'uppercase'
        }
    })


    
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
                <Text style={styles.loginText}>Número de contato</Text>
                <TextInput
                style={styles.loginInput}
                placeholder="(99) 99999-9999"
                placeholderTextColor="#96B298" 
                ></TextInput>
                <Pressable
               
                style={styles.loginButton}
                >
                    <Text
                    style={styles.loginButtonText}
                    >Enviar SMS</Text>
                </Pressable>
            </View>
            
        </View>
    )
}