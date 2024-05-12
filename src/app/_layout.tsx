import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";

// Import your global CSS file
import "./global.css"

export default function Layout() {
  return  (
    <>
      <StatusBar style="light" />
      <Slot />
    </>
  )
  }


