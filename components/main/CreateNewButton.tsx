import { Pencil } from 'lucide-react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'


interface CreateNewButtonProps {
    onPress: () => void
}

const CreateNewButton = ({ onPress }: CreateNewButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress} className='p-4 rounded-2xl shadow-lg absolute bottom-8 right-8 bg-yellow-400 border border-yellow-500'>
            <Pencil size={24} />
        </TouchableOpacity>
    )
}

export default CreateNewButton