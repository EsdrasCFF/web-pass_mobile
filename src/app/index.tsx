import { colors } from '@/assets/styles/colors'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { useState } from 'react'
import { View, Image, StatusBar, Alert } from 'react-native'


export default function Home() {

  const [ code, setCode ] = useState('')

  function handleAccessCredentials() {
    if(!code.trim()) {
      return Alert.alert("Credentiais", 'Informe o código do ingresso!')
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
          <MaterialCommunityIcons 
            name='ticket-confirmation-outline'
            color={colors.green[200]}
            size={20}
          />

          <Input placeholder='Código do ingresso' onChangeText={(value) => setCode(value)} />
        </View>

        <Button title='Acessar credencial' onPress={handleAccessCredentials} />

        <Link href='/register' className='text-base font-bold text-gray-100 text-center mt-8' > Ainda não possui ingresso? </Link>
      </View>
    </View>
  )
}