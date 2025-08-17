import { router } from 'expo-router'
import { ChevronLeft, Ellipsis, Share } from 'lucide-react-native'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'

interface NoteHeaderProps {

}

const NoteHeader = ({ }: NoteHeaderProps) => {
    return (
        <View className='relative min-h-52 max-h-60 bg-lime-500 w-screen self-center px-5'>
            <View className='absolute top-3 w-full min-h-11 flex-row items-center justify-between self-center z-50'>
                <TouchableOpacity onPress={() => router.back()} className='rounded-full bg-white p-2'>
                    <ChevronLeft size={22} />
                </TouchableOpacity>
                <View className='flex-row items-center justify-end gap-4'>
                    <TouchableOpacity className='rounded-full bg-white p-2'>
                        <Share size={22} />
                    </TouchableOpacity>
                    <TouchableOpacity className='rounded-full bg-white p-2'>
                        <Ellipsis size={22} />
                    </TouchableOpacity>
                </View>
            </View>
            <Image source={{ uri: "https://picsum.photos/700/300" }} className='w-screen self-center h-full object-cover' />
        </View>
    )
}

export default NoteHeader

const styles = StyleSheet.create({})