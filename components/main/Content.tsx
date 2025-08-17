import { useNote } from '@/contexts/NoteContext'
import { router } from 'expo-router'
import { Star } from 'lucide-react-native'
import React from 'react'
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native'


const tabs = [
    { name: 'Recent', key: 'recent' },
    { name: 'Favourites', key: 'favourites' },
    { name: 'Deleted', key: 'deleted' },
    { name: 'Archived', key: 'archived' },
]



const generateRandomColor = (): string => {
    const colors = ["bg-red-200", "bg-cyan-200", "bg-blue-200", "bg-gray-200"]
    const random = Math.floor(Math.random() * colors.length)

    return colors[random] ?? "bg-red-200"
}

const Content = () => {
    const [selectedTab, setSelectedTab] = React.useState(tabs[0].key)
    const { notes } = useNote()

    return (
        <View className='flex-1 flex flex-col gap-0 justify-start '>
            <ScrollView
                horizontal
                contentContainerStyle={{ display: 'flex', flexDirection: "row", alignItems: "center", gap: 12, height: 42, width: "100%" }}
            >
                {tabs.map((tab) => (
                    <TouchableOpacity onPress={() => setSelectedTab(tab.key)} key={tab.key} className={`pb-3 h-12 px-2 max-h-full bg-transparent ${selectedTab === tab.key ? "border-b-4" : "border-b-0"} border-yellow-500`}>
                        <Text className={`text-lg ${selectedTab === tab.key ? "font-semibold text-black" : "text-gray-400"}`}>{tab.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <FlatList
                style={{ height: "100%", width: "100%" }}
                className='space-y-4'
                data={notes}
                keyExtractor={(data) => data.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => router.push({
                            pathname: '/(main)/notes/[id]',
                            params: { id: item.id }
                        })}
                        className='w-full rounded-xl bg-white shadow-xs flex flex-col justify-between gap-6 my-3 p-5'>
                        <View className='w-full flex flex-col gap-2'>
                            <Text className='font-dmsans-medium '>
                                {item.title}
                            </Text>
                            <Text className='font-dmsans text-gray-500'>
                                {item.content}
                            </Text>
                        </View>

                        <View className='flex flex-row flex-wrap gap-2'>
                            {
                                item.tags.map(tag => (
                                    <View key={tag.toString()} className={`rounded-xl py-2 px-3 bg-gray-200 ${generateRandomColor()}`}>
                                        <Text className='text-sm font-dmsans'>
                                            {tag}
                                        </Text>
                                    </View>
                                ))
                            }
                        </View>
                        <View className='flex flex-row w-full justify-between items-center'>
                            <Text className='font-dmsans text-gray-600'>{item.updatedAt}</Text>
                            <View>
                                {item.isFavourite ? <Star size={18} fill={'#facc15'} color={'#ca8a04'} /> : <Star size={18} color={'gray'} />}
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />

        </View>
    )
}

export default Content