import { colors } from '@/assets/styles/colors'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { api } from '@/server/api'
import { useBadgeStore } from '@/store/badge-store'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Link, Redirect } from 'expo-router'
import { useState } from 'react'
import { View, Image, StatusBar, Alert } from 'react-native'


export default function Home() {

  const [ code, setCode ] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const badgeStore = useBadgeStore()
  console.log('---->', badgeStore.data)

  async function handleAccessCredentials() {
    try {
    
      if(!code.trim()) {
        return Alert.alert("Credenciais", 'Informe o código do ingresso!')
      }

      setIsLoading(true)

      const { data } = await api.get(`/attendees/${code}/badge`)

      badgeStore.save(data.badge)

    } catch(error) {
      console.log('Error:', error)

      Alert.alert('Ingresso', 'Ingresso não encontrado!')

    }
    
  }

  if(badgeStore.data?.checkInURL) {
    return <Redirect href='/ticket' />
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

        <Button title='Acessar credencial' onPress={handleAccessCredentials} isLoading={isLoading} />

        <Link href='/register' className='text-base font-bold text-gray-100 text-center mt-8' > Ainda não possui ingresso? </Link>
      </View>
    </View>
  )
}