import { StyleSheet, Text, TextInput, View, Image} from "react-native-web";


export default function Login(){

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
        },
        welcomeText:{
            color:"#fff",
            fontSize: 40,
            fontFamily: 'OpenSans'
        },
        welcomeImage:{
            width: 200,
            height: 175
        }
    })
    
    return(
        <View style={styles.container}>
            <View style={styles.welcomeView}>
                <Image
                source={require('../../assets/greencode-symbol.svg')}
                />
                <Text style={styles.welcomeText}>Bem vindo</Text>
            </View>
            <TextInput></TextInput>
        </View>
    )
}