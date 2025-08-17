import { NoteProvider } from "@/contexts/NoteContext";
import { Stack } from "expo-router";

export default function MainLayout() {
    return (
        <NoteProvider>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="notes/[id]" options={{ headerShown: false }} />
            </Stack>
        </NoteProvider>
    )
}