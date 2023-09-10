import { create } from 'zustand'

type State = { selectedBlockID: string }
type Action = {
	setSelectedBlockID: (lastName: State['selectedBlockID']) => void
}

const useSelectedBlockID = create<State & Action>((set) => ({
	selectedBlockID: 'root',
	setSelectedBlockID: (id) => set(() => ({ selectedBlockID: id })),
}))

export default useSelectedBlockID
