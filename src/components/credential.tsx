import { colors } from "@/assets/styles/colors";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Image, ImageBackground, Pressable, Text, TouchableOpacity, View } from "react-native";
import { QRCode } from "@/components/qrcode";
import { BadgeStore } from "@/store/badge-store";

type Props = {
  data: BadgeStore
  onChangeAvatar?: () => void
  onShowQRCode?: () => void 
}

export function Credential({ data, onChangeAvatar, onShowQRCode }: Props) {


  return (
    <View className="w-full items-center px-10" >
      <Image 
        source={require('@/assets/ticket/band.png')} 
        className="w-24 h-52 z-10"
      />

      <View className=" bg-black/20 items-center self-stretch pb-6 border border-white/10 mx-3 -mt-5 rounded-2xl" >
        <ImageBackground 
          source={require("@/assets/ticket/header.png")} 
          className="px-6 py-8 h-40 items-center self-stretch border-b border-white/10 overflow-hidden"
        >
          <View className="w-full flex-row items-center justify-between" >
            <Text className="text-zinc-50 text-sm font-bold capitalize" > {data.eventTitle} </Text>
            <Text className="text-zinc-50 text-sm font-bold" > #{data.id} </Text>
          </View>

          <View className="w-40 h-40 bg-black rounded-full" />
        </ImageBackground>

        {data.image ? (
          <TouchableOpacity activeOpacity={0.5} onPress={onChangeAvatar}>
            <Image 
              source={{uri: data.image}}
              className="w-36 h-36 rounded-full -mt-24"
            />
           </TouchableOpacity>
        ) : (
          <TouchableOpacity activeOpacity={0.5} onPress={onChangeAvatar}>
            <View className="w-36 h-36 rounded-full bg-gray-400 items-center justify-center -mt-24" >
              <Feather name="camera" color={colors.green[400]} size={32}  />
            </View>
          </TouchableOpacity>
        )}


        <Text className="font-bold text-2xl text-zinc-50 mt-4 capitalize" > {data.name} </Text>
  
        <Text className="font-regular text-base text-zinc-300 mb-4 lowercase" > {data.email} </Text>
      
        <QRCode value={data.checkInURL} size={120} />

        <TouchableOpacity  activeOpacity={0.5} onPress={onShowQRCode}>
          <Text className="mt-6 font-body text-sm text-orange-500" >  Ampliar QRCode  </Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}