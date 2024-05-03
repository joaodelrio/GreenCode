import { useEffect, useState } from "react";
import { Image, Text, View, StyleSheet, SafeAreaView } from "react-native-web";
import Home from "./Home";

export default function SplashScreen({navigation}){

    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#19B729",
            flex:1,
            padding: 24,
            justifyContent: 'center',
            alignItems: 'center'
        },
    });         

    useEffect(()=> {
        setTimeout(() => navigation.navigate('Login'), 2000) 
    }, [])
    

    return (
        <View style={styles.container} >
                
            <Image
           source={require('../../assets/greencode.svg')}
            />
                 
        </View>
    )
}