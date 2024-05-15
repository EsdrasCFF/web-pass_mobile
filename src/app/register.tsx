import { colors } from '@/assets/styles/colors'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { View, Image, StatusBar, Alert } from 'react-native'
import axios from 'axios'

import { api } from '@/server/api'
import { useBadgeStore } from '@/store/badge-store'

const EVENT_ID = "29a56924-b4c3-437d-aed7-f42fa6a6b142"

export default function Register() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const badgeStore = useBadgeStore()

  async function handleRegister() {
    
    try {
      if(!name.trim() || !email.trim()) {
        return Alert.alert('Inscrição', 'Preencha todos os campos!')
      }
      
      setIsLoading(true)

      const registerResponse = await api.post(`/events/${EVENT_ID}/attendees`, {
        name,
        email
      })

      if(registerResponse.data.attendeeId) {
        
        const badgeResponse = await api.get(`/attendees/${registerResponse.data.attendeeId}/badge`)

        badgeStore.save(badgeResponse.data.badge)


        Alert.alert('Inscrição', 'Inscrição realizada com sucesso!', [
          {text: 'OK', onPress: () => router.push('/ticket') },
        ])
      }

      
    } catch(error) {
      console.log('Error to the trying login:', error)

      if(axios.isAxiosError(error)) {
        if(String(error.response?.data.message).includes('already registered')) {
          return Alert.alert('Inscrição', 'Este e-mai já está cadastrado!')
        }
      }

      Alert.alert('Inscrição', 'Não foi possível concluir a sua inscrição. Tente novamente mais tarde!')
    } finally {
      setIsLoading(false)
    }
  }

  return ( 
    <View className='bg-green-500 flex-1 items-center justify-center p-10'>
      <StatusBar barStyle='light-content' />
      <Image 
        source={require("@/assets/logo.png")}
        className='h-16'
        resizeMode='contain'
      />

      <View className='w-full mt-12 gap-3' >
        <View className='w-full h-14 flex-row items-center gap-3 p-3 border border-green-400 rounded-lg' >
          <FontAwesome6 
            name='user-circle'
            color={colors.green[200]}
            size={20}
          />

          <Input placeholder='Nome completo' onChangeText={setName} />
        </View>

        <View className='w-full h-14 flex-row items-center gap-3 p-3 border border-green-400 rounded-lg' >
          <MaterialIcons 
            name='alternate-email'
            color={colors.green[200]}
            size={20}
          />

          <Input placeholder='E-mail' keyboardType='email-address' onChangeText={setEmail} />
        </View>

        <Button 
          title='Realizar Inscrição' 
          onPress={handleRegister} 
          isLoading={isLoading}
        />

        <Link href='/' className='text-base font-bold text-gray-100 text-center mt-8' > Já possui ingresso? </Link>
      </View>
    </View>
  )
}