import { colors } from '@/assets/styles/colors'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { useState } from 'react'
import { View, Image, StatusBar, Alert } from 'react-native'


export default function Register() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')



  function handleRegister() {
    if(!name.trim() || !email.trim()) {
      return Alert.alert('Inscrição', 'Preencha todos os campos!')
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

        <Button title='Realizar Inscrição' onPress={handleRegister} />

        <Link href='/' className='text-base font-bold text-gray-100 text-center mt-8' > Já possui ingresso? </Link>
      </View>
    </View>
  )
}