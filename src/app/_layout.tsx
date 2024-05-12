import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";

// Import your global CSS file
import "./global.css"

import { useFonts, Roboto_700Bold, Roboto_500Medium, Roboto_400Regular } from '@expo-google-fonts/roboto'

export default function Layout() {
  return  (
    <>
      <StatusBar style="light" />
      <Slot />
    </>
  )
  }


