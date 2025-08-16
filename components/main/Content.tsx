import { Star } from 'lucide-react-native'
import React, { useState } from 'react'
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native'


const tabs = [
    { name: 'Recent', key: 'recent' },
    { name: 'Favourites', key: 'favourites' },
    { name: 'Deleted', key: 'deleted' },
    { name: 'Archived', key: 'archived' },
]

const data = [
    { id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), title: "Evidence Supporting Biological Evolution", content: "Evolution, theory in biology postulating...", updatedAt: "July 18, 2025", isFavourite: false, tags: ["Biology", "Evolution"] },
    { id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), title: "Evolutionary Psychology", content: "Evolutionary psychology is a branch of psychology that...", updatedAt: "April 19, 2023", isFavourite: true, tags: ["Psychology", "Evolution"] },
    { id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), title: "Evolution of Human Language", content: "The evolution of human language is a complex and...", updatedAt: "March 15, 2022", isFavourite: false, tags: ["Language", "Evolution"] },
    { id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), title: "Evolution of Human Brain", content: "The evolution of the human brain has been a long...", updatedAt: "June 1, 2020", isFavourite: true, tags: ["Brain", "Evolution"] },
    { id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), title: "Evolution of Human Body", content: "The evolution of the human body has been influenced by...", updatedAt: "May 15, 2019", isFavourite: false, tags: ["Body", "Evolution"] },
    { id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), title: "Evidence Supporting Biological Evolution", content: "Evolution, theory in biology postulating...", updatedAt: "July 18, 2025", isFavourite: false, tags: ["Biology", "Evolution"] },
    { id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), title: "Evolutionary Psychology", content: "Evolutionary psychology is a branch of psychology that...", updatedAt: "April 19, 2023", isFavourite: true, tags: ["Psychology", "Evolution"] },
    { id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), title: "Evolution of Human Language", content: "The evolution of human language is a complex and...", updatedAt: "March 15, 2022", isFavourite: false, tags: ["Language", "Evolution"] },
    { id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), title: "Evolution of Human Brain", content: "The evolution of the human brain has been a long...", updatedAt: "June 1, 2020", isFavourite: true, tags: ["Brain", "Evolution"] },
    { id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), title: "Evolution of Human Body", content: "The evolution of the human body has been influenced by...", updatedAt: "May 15, 2019", isFavourite: false, tags: ["Body", "Evolution"] },
]

const Content = () => {
    const [selectedTab, setSelectedTab] = React.useState(tabs[0].key)
    const [notes, setNotes] = useState(data)
    return (
        <View className='flex-1 flex flex-col gap-0 justify-start '>
            <ScrollView
                horizontal
                contentContainerStyle={{ display: 'flex', flexDirection: "row", alignItems: "center", gap: 12, height: 36, width: "100%" }}
            >
                {tabs.map((tab) => (
                    <TouchableOpacity onPress={() => setSelectedTab(tab.key)} key={tab.key} className={`pb-3 h-10 px-2 max-h-full bg-transparent ${selectedTab === tab.key ? "border-b-4" : "border-b-0"} border-yellow-500`}>
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
                    <TouchableOpacity className='w-full rounded-xl bg-white shadow-xs flex flex-col justify-between gap-6 my-3 p-5'>
                        <Text className='font-dmsans-medium '>
                            {item.title}
                        </Text>
                        <Text className='font-dmsans'>
                            {item.content}
                        </Text>
                        <View className='flex '>
                        </View>
                        <View className='flex flex-row w-full justify-between items-center'>
                            <Text>{item.updatedAt}</Text>
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