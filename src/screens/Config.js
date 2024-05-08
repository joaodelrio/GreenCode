import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, Button, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { OPENAI_API_KEY } from '../../config-env.js';

export default function Chat({navigation}) {

    
    const navigateToChat = ()=>{
      navigation.navigate("Chat")
    }

    return ( 
        <View style={styles.container}>

          {/* Header  */}
          <View style={styles.header}>
            <View style={{
              displar:'flex',
              flexDirection: 'row'
            }}>
              <Image
              style={styles.headerImage}
              source={require('../../assets/green-symbol.png')}
              />
              <Text style={styles.headerText}>GreenCode</Text>
            </View>
            <View style={{
              marginTop:10,
              width: '30%',
              displar:'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              <MaterialIcons name="settings" size={25} color="#19B729" />
              <MaterialIcons name="help" size={25} color="white" />
              <MaterialIcons name="logout" size={25} color="#F23131" />
            </View>
          </View>

          <View style={styles.mainView}>
              <Pressable
                style={styles.backButton}
                onPress={()=> navigateToChat()} 
              >
                <MaterialIcons name="arrow-back" size={25} color="white" />
                <Text style={styles.backButtonText}>Voltar</Text>
              </Pressable>
            <View>
              <View>
                <MaterialIcons name="dark-mode" size={25} color="#F23131" />
                <Text>Modo escuro</Text>
              </View>
              <View >
                <MaterialIcons name="insert-drive-file" size={25} color="#F23131" />
                <Text>Termos de uso</Text>
              </View>
              <View>
                <MaterialIcons name="info" size={25} color="#F23131" />
                <Text>Sobre nós</Text>
              </View>
            </View>
            <View>
              <Text>Direitos reservados a Greencode</Text>
            </View>
          </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2E2E2E',
    },
    header: {
      paddingHorizontal: 20,
      backgroundColor: '#1E1E1E',
      alignItems: 'center',
      flexDirection: 'row', 
      justifyContent: 'space-between',
      height: 70
    },
    headerText: {
      marginTop:15,
      color: '#fff',
      fontSize: 20,
      fontFamily: 'Sora_Semibold',
    },
    headerImage: {
      width: 55,
      height: 48
    },
    mainView:{
      padding: 24,
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'space-between'
    },
    backButton:{
      display: 'flex',
      flexDirection: 'row',
    },
    backButtonText:{
      color: "white",
      fontSize: 16,
      fontFamily: "Sora_Semibold",
      marginTop: 4,
      marginLeft: 11
    },
    configListView:{
      
    }
    
  });