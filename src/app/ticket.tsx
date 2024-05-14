import { Header } from "@/components/header";
import { Credential } from "@/components/credential";
import { View, Text, StatusBar, ScrollView, Pressable, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "@/assets/styles/colors";
import { Button } from "@/components/button";
import { useState } from "react";

import * as ImagePicker from 'expo-image-picker'

export default function Ticket() {
  
  const [image, setImage] = useState('')

  async function handleSelectImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4,4]
      })

      if(result.assets) {
        setImage(result.assets[0].uri)
        console.log(result.assets)
      }


    } catch (error) {
      console.log(error)
      Alert.alert('Foto', 'Não foi possível selecionar a imagem!')
    }
  }
  
  return (
    <View className='flex-1 bg-green-500' >
      <StatusBar barStyle='light-content' />
      <Header title="Minha Credencial" />

      <ScrollView className="-mt-28 -z-10" contentContainerClassName="px-8 pb-8" showsVerticalScrollIndicator={false}>

        <Credential imageUrl={image} onChangeAvatar={handleSelectImage} />

        <FontAwesome  name="angle-double-down" size={24}  color={colors.gray[300]}  className="self-center my-6" />

        <View className="px-10 gap-1" >
          <Text className="font-bold text-2xl mt-4 text-center text-white" > Compartilhar credencial </Text>

          <Text className="text-base text-gray-200 mb-6" >Mostre ao mundo que você vai participar do Unite Summit! </Text>
        
          <Button title="Compartilhar" />

          <Pressable className="self-center mt-10" >
            <Text className="text-white font-bold" > Remover Ingresso</Text>
          </Pressable>
        </View>
    
      </ScrollView>
    </View>
  )
}