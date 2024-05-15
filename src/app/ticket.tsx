import { Header } from "@/components/header";
import { Credential } from "@/components/credential";
import { View, Text, StatusBar, ScrollView, Pressable, Alert, Modal, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "@/assets/styles/colors";
import { Button } from "@/components/button";
import { useState } from "react";

import * as ImagePicker from 'expo-image-picker'
import { QRCode } from "@/components/qrcode";
import { useBadgeStore } from "@/store/badge-store";
import { Redirect } from "expo-router";

export default function Ticket() {
  
  const [image, setImage] = useState('')
  const [expandQRCode, setExpandQRCode] = useState(false)

  const badgeStore = useBadgeStore()

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
  
  if(!badgeStore.data?.checkInURL) {
    return <Redirect href='/' />
  }

  return (
    <View className='flex-1 bg-green-500' >
      <StatusBar barStyle='light-content' />
      <Header title="Minha Credencial" />

      <ScrollView className="-mt-28 -z-10" contentContainerClassName="px-8 pb-8" showsVerticalScrollIndicator={false}>

        <Credential imageUrl={image} onChangeAvatar={handleSelectImage} onShowQRCode={() => setExpandQRCode(true)} data={badgeStore.data} />

        <FontAwesome  name="angle-double-down" size={24}  color={colors.gray[300]}  className="self-center my-6" />

        <View className="px-10 gap-1" >
          <Text className="font-bold text-2xl mt-4 text-center text-white" > Compartilhar credencial </Text>

          <Text className="text-base text-gray-200 mb-6" >Mostre ao mundo que você vai participar do {badgeStore.data.eventTitle} </Text>
        
          <Button title="Compartilhar" />

          <TouchableOpacity activeOpacity={0.7} onPress={() => badgeStore.remove()} >
            <Text className="text-white font-bold self-center mt-10" > Remover Ingresso</Text>
          </TouchableOpacity> 
        </View>
    
      </ScrollView>

      <Modal visible={expandQRCode} statusBarTranslucent animationType="fade" >
        <View className="flex-1 bg-green-500 items-center justify-center" >
          <TouchableOpacity activeOpacity={0.7} onPress={() => setExpandQRCode(false)} >
            <QRCode value="teste" size={280} />
            
            <Text className="text-base text-white font-bold text-center mt-12" > Fechar </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}