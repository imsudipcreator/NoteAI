import { data } from "@/constants/demoData";
import { Note } from "@/types/notes";
import React, { createContext, useContext, useState } from "react";

export type NoteContextType = {
    note: string
    setNote: React.Dispatch<React.SetStateAction<string>>
    notes: Note[]
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>
    createNote : (title: string, content: string) => void
    getNote: (id: string) => Note | undefined
}

const NoteContext = createContext<NoteContextType | null>(null)


export const NoteProvider = ({ children }: { children: React.ReactNode }) => {
    const [note, setNote] = useState('')
    const [notes, setNotes] = useState<Note[]>(data)

    const createNote = (title: string, content: string) => {
        const newNote = {
            id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
            title,
            content,
            updatedAt: new Date().toLocaleDateString(),
            isFavourite: false,
            tags: []
        }
        setNotes([...notes, newNote])
    }


    const getNote = (id: string) => notes.find(note => note.id === id)
    return (
        <NoteContext.Provider value={{
            note,
            setNote,
            notes,
            setNotes,
            createNote,
            getNote
        }}>
            {children}
        </NoteContext.Provider>
    )
}


export const useNote = () => {
    const context = useContext(NoteContext)
    if (!context) {
        throw new Error('useNote must be used within a NoteProvider')
    }
    return context
}