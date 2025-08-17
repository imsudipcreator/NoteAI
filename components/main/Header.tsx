import { Gem, Search, Settings } from 'lucide-react-native';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const Header = () => {
    return (
        <View className='w-full min-h-12 pt-3 flex flex-col items-center justify-center '>
            <View className='w-full h-16 flex flex-row items-center justify-between'>
                <Text className='text-3xl font-semibold font-dmsans-medium'>Note AI</Text>
                <View className='flex flex-row items-center justify-center gap-4'>
                    <TouchableOpacity activeOpacity={0.6} className='flex flex-row items-center justify-center rounded-full font gap-1 px-2.5 py-1.5 bg-yellow-400 border border-yellow-600'>
                        <Gem size={16} color={'#713f12'}/>
                        <Text className='font-dmsans-medium text-yellow-900'>Try Pro</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} className='bg-transparent'>
                        <Settings size={22} />
                    </TouchableOpacity>
                </View>
            </View>
            <View className='h-20 w-full '>
                <View className='w-full rounded-2xl flex flex-row bg-gray-200 overflow-clip'>
                    <View className='h-full flex items-center justify-center px-3'>
                        <Search size={22} color={'gray'}/>
                    </View>
                    <TextInput style={{ fontSize : 16 }} className='flex-1 bg-transparent font-dmsans' placeholder='Search your notes...'/>
                </View>
            </View>
        </View>

    )
}

export default Header