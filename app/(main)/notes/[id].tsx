import NoteHeader from '@/components/main/NoteHeader'
import { useNote } from '@/contexts/NoteContext'
import { Note } from '@/types/notes'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useRef } from 'react'
import { Dimensions, Keyboard, ScrollView, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

const { height: SCREEN_HEIGHT } = Dimensions.get("screen")

const NoteScreen = () => {
    const { id } = useLocalSearchParams()
    const [isLoading, setIsLoading] = React.useState(false)
    const { getNote } = useNote()
    const [note, setNote] = React.useState<Note>({} as Note)
    const editorRef = useRef<RichEditor>(null);


    const toolbarOffset = useSharedValue(0)

    useEffect(() => {
        const showSub = Keyboard.addListener("keyboardDidShow", e => {
            toolbarOffset.value = withTiming(-e.endCoordinates.height, { duration: 250 });
        });

        const hideSub = Keyboard.addListener("keyboardDidHide", () => {
            toolbarOffset.value = withTiming(0, { duration: 250 });
        });

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);


    const toolbarStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: toolbarOffset.value }],
    }));


    useEffect(() => {
        const foundNote = getNote(id as string)
        if (foundNote) setNote(foundNote)
    }, [id, getNote])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} className='flex-1'>
            <SafeAreaView style={{ maxHeight: SCREEN_HEIGHT }} className='flex-1 bg-white overflow-hidden'>
                <View className='flex-1' >
                    <ScrollView className='px-4 flex-1'>
                        <NoteHeader />
                        <TextInput
                            multiline
                            value={note.title}
                            onChangeText={(text) => setNote((note) => ({ ...note, title: text }))}
                            placeholder='Note title'
                            className='text-3xl font-dmsans-semibold w-full my-2'
                        />
                        <RichEditor placeholder='Type something...' style={{ flex: 1 }} editorStyle={{ cssText: "body { font-size: 18px; font-family: 'DMSans_400Regular;}" }} ref={editorRef} initialContentHTML={note.content} />
                    </ScrollView>
                    <Animated.View style={toolbarStyle} className={''}>
                        <RichToolbar
                            editor={editorRef}
                            style={{
                                backgroundColor: "white",
                                borderColor: "#ccc",
                                borderTopWidth: 1,
                                borderRadius: 5,
                                paddingHorizontal: 10,
                                height: 58
                            }}
                            actions={[
                                actions.undo,
                                actions.redo,
                                actions.setBold,
                                actions.setItalic,
                                actions.insertBulletsList,
                                actions.insertOrderedList,
                                actions.insertLink,
                                actions.insertImage,
                                actions.code,
                                actions.table,
                                actions.setStrikethrough,
                                actions.heading1,
                                actions.removeFormat,
                                actions.indent,
                                actions.outdent,
                                actions.blockquote,
                                actions.setSubscript,
                                actions.setSuperscript,
                                actions.keyboard,
                            ]}
                        />

                    </Animated.View>
                </View>

            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default NoteScreen