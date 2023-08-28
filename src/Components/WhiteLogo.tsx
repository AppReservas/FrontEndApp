import React from 'react'
import { Image, View } from 'react-native'

export const WhiteLogo = () => {
  return (
    <View style = {{
        alignItems: 'center'
    }}>
        <Image source={require('../assets/Sporty3.png')}
        style ={{
            width: 260,
            height: 60,
        
        }}
         />
    </View>

  )
}
