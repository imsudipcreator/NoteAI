import BottomSheet, { BottomSheetRefProps } from '@/components/main/BottomSheet';
import Content from '@/components/main/Content';
import CreateNewButton from '@/components/main/CreateNewButton';
import Header from '@/components/main/Header';
import React, { useCallback, useRef } from 'react';
import { Dimensions, Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSharedValue, withSpring } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';


const { height: SCREEN_HEIGHT } = Dimensions.get("screen")

const HomeScreen = () => {
    const translateY = useSharedValue(SCREEN_HEIGHT)
    const ref = useRef<BottomSheetRefProps>(null)
    const onPress = useCallback(() => {
        translateY.value = withSpring(0, { damping: 20 })
        if (ref.current) ref.current.setIsOpen(true)
    }, [translateY])
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <SafeAreaView className='flex-1'>
                    <View className='flex-1 px-4'>
                        <Header />
                        <Content />
                        <CreateNewButton onPress={onPress} />
                        <BottomSheet ref={ref} translateY={translateY} />
                    </View>
                </SafeAreaView>
            </GestureHandlerRootView>
        </TouchableWithoutFeedback>

    )
}

export default HomeScreen