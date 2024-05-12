import { ReactNode } from "react";
import { TextInput, TextInputProps, View } from "react-native";
import { colors } from '@/assets/styles/colors'

export function Input({...props}: TextInputProps) {
  return (
    <TextInput 
      className="flex-1 text-white text-base font-regular placeholder:text-white"
      placeholderTextColor={colors.gray[200]} 
      {...props}
    />
  )
}
