import { ReactNode, useState } from "react";
import { TouchableOpacity, Text, View, Touchable, Pressable, TouchableHighlight, ActivityIndicator, PressableProps } from "react-native"

type Props = PressableProps & {
  title: string;
  isLoading?: boolean;
}

export function Button({title, isLoading = false, ...rest}: Props) {

  const [pressed, setPressed] = useState(false)

  function onButtonPressedIn() {
    setPressed(true)
  }

  function onButtonPressedOut() {
    setPressed(false)
  }

  return (
    <Pressable 
      className={`bg-orange-500 w-full h-14 items-center justify-center rounded-lg ${pressed && 'opacity-70'}`} onPressIn={onButtonPressedIn} onPressOut={onButtonPressedOut}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator className="text-green-500" />
      ) : (
        <Text className="text-green-500 text-base font-bold uppercase" >{title}</Text>
      )}

    </Pressable >
  )
}