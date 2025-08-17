import { useNote } from '@/contexts/NoteContext'
import { AudioLines, Camera, FileUp, ImageUp, Link, Mic, Type, Youtube } from 'lucide-react-native'
import React, { useCallback } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { runOnJS, SharedValue, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'


const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("screen")


interface BottomSheetProps {
    translateY: SharedValue<number>
}

export type BottomSheetRefProps = {
    active: SharedValue<boolean>
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const BottomSheet = React.forwardRef<BottomSheetRefProps, BottomSheetProps>(({ translateY }, ref) => {
    const startY = useSharedValue(0)
    const active = useSharedValue(false)
    const [isOpen, setIsOpen] = React.useState(false)
    const { createNote } = useNote()


    const scrollTo = useCallback((destination: number) => {
        'worklet';
        translateY.value = withSpring(destination, {}, () => {
            runOnJS(setIsOpen)(false)
        })
    }, [translateY])

    React.useImperativeHandle(ref, () => ({
        active,
        setIsOpen
    }))
    const gesture = Gesture.Pan()
        .onStart(() => {
            startY.value = translateY.value
        })
        .onUpdate((e) => {
            // console.log(e.translationY)
            // console.log('\nfirst: ', translateY.value)
            if (e.translationY > 0) translateY.value = startY.value + e.translationY
        })
        .onEnd((e) => {
            if (e.absoluteY > SCREEN_HEIGHT / 1.2) {
                scrollTo(SCREEN_HEIGHT)
            } else {
                translateY.value = withSpring(0)
                // active.value = true
            }
            // console.log("Screen height :", SCREEN_HEIGHT)
            // console.log("absoluteX :", e.absoluteY)
            console.log('active', active.value)
        })

    const rBottomSheetStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }]
        }
    })


    // const rBgStyle = useAnimatedStyle(() => {
    //     const opacity = interpolate(translateY.value, [0, 1], [1, 0], Extrapolation.CLAMP)
    //     return {
    //         opacity,
    //     }
    // })



    // useEffect(() => {
    //     if (active.value === true) {
    //         setIsOpen(true)
    //     } else {
    //         setIsOpen(false)
    //     }
    // }, [active.value])
    return (
        <>
            <Animated.View style={[{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH, ...StyleSheet.absoluteFillObject }]} className={`bg-black/20 backdrop-blur-xl absolute z-40 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} />
            <Animated.View style={[rBottomSheetStyle, { minHeight: SCREEN_HEIGHT * 0.5, bottom: 0 }]} className={`w-full absolute bg-gray-100 border-2 border-white bottom-0 z-50  gap-3 self-center rounded-[2rem] flex flex-col items-center justify-start px-6`}>
                <GestureDetector gesture={gesture}>
                    <View className='w-full min-h-3 bg-transparent flex items-center justify-center'>
                        <View className='h-[5px] w-[60px] rounded-full my-4 bg-gray-500' />
                    </View>
                </GestureDetector>
                <Text className='font-dmsans-medium text-lg'>Create New Note</Text>
                <View className='flex flex-col gap-2 w-full mt-6'>
                    <Text className='font-dmsans text-gray-400 font-medium'>
                        Audio
                    </Text>
                    <View className='flex-row gap-2'>
                        <TouchableOpacity className='bg-white rounded-xl flex-1 py-3 flex flex-row items-center justify-center gap-1.5'>
                            <Mic size={18} />
                            <Text>Record Audio</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='bg-white rounded-xl py-3 flex-1 flex flex-row items-center justify-center gap-1.5'>
                            <AudioLines size={18} />
                            <Text>Upload Audio</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className='flex flex-col gap-2 w-full mt-6'>
                    <Text className='font-dmsans text-gray-400 font-medium'>
                        Photo
                    </Text>
                    <View className='flex-row gap-2'>
                        <TouchableOpacity className='bg-white rounded-xl flex-1 py-3 flex flex-row items-center justify-center gap-1.5'>
                            <Camera size={18} />
                            <Text>Take Picture</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='bg-white rounded-xl py-3 flex-1 flex flex-row items-center justify-center gap-1.5'>
                            <ImageUp size={18} />
                            <Text>Upload Image</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className='flex flex-col gap-2 w-full border-t-2 border-dashed border-gray-300 py-6 mt-6'>
                    <Text className='font-dmsans text-gray-400 font-medium'>
                        Other
                    </Text>
                    <View className='flex-row gap-2'>
                        <TouchableOpacity onPress={() => {
                            createNote("Untitled Note", "")
                            scrollTo(SCREEN_HEIGHT)
                        }} className='bg-white rounded-xl py-3 flex-1 flex flex-row items-center justify-center gap-1.5'>
                            <Type size={18} />
                            <Text>Type Text</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='bg-white rounded-xl py-3 flex flex-1 flex-row items-center justify-center gap-1.5'>
                            <Youtube size={18} />
                            <Text>Youtube Video</Text>
                        </TouchableOpacity>
                    </View>
                    <View className='flex-row gap-2'>
                        <TouchableOpacity className='bg-white rounded-xl py-3 flex-1 flex flex-row items-center justify-center gap-1.5'>
                            <Link size={18} />
                            <Text>Webpage Url</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='bg-white rounded-xl py-3 flex flex-1 flex-row items-center justify-center gap-1.5'>
                            <FileUp size={18} />
                            <Text>Upload PDF</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        </>
    )
})

BottomSheet.displayName = 'BottomSheet'

export default BottomSheet