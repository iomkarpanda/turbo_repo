import { Slot } from "expo-router"

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider"
import { AuthProvider } from "@/providers/AuthProvider"
import "@/global.css"

export default () => {
  return (
    <GluestackUIProvider mode="dark">
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </GluestackUIProvider>
  )
}