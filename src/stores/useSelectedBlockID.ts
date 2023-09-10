import { create } from 'zustand'

type State = { selectedBlockID: string }
type Action = {
	setSelectedBlockID: (id: string) => void
}

const useSelectedBlockID = create<State & Action>((set) => ({
	selectedBlockID: 'root',
	setSelectedBlockID: (id) => set(() => ({ selectedBlockID: id })),
}))

export default useSelectedBlockID
