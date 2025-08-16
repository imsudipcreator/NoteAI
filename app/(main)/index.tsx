import Header from '@/components/main/Header'
import React from 'react'
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const HomeScreen = () => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView className='flex-1'>
                <View className='flex-1'>
                    <Header />
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default HomeScreen