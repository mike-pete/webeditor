import { create } from 'zustand'
import { BlockShape } from '../types/global'
import { RootBlockId, defaultRootStyle } from '../constants/const'
import { createNewBlock } from './useLayout.utils'

type State = {
	selectedBlockID: string
	layout: Record<string, BlockShape>
}
type Action = {
	setSelectedBlockID: (id: string) => void
	addChildBlock: (
		parentBlockID: string,
		childIndex?: number,
		block?: Partial<BlockShape>
	) => void
}

export const useLayout = create<State & Action>((set, get) => ({
	// STATE
	selectedBlockID: 'root',
	layout: {
		[RootBlockId]: {
			id: RootBlockId,
			style: defaultRootStyle,
			children: [],
			parent: '',
		},
	},

	// ACTIONS
	setSelectedBlockID: (id) => set(() => ({ selectedBlockID: id })),
	addChildBlock: (parentBlockID, childIndex, block) =>
		set((state) => {
			// make sure parent block is valid
			const selectedBlockID = get().selectedBlockID
			parentBlockID = parentBlockID ?? selectedBlockID
			const parentBlock = get().layout[parentBlockID]

			if (!parentBlock) {
				console.error(`block [${parentBlockID}] not found`)
				return { ...state }
			}

			const newBlock = createNewBlock(block)

			// insert new block id into parent's children array
			const newParentChildren = [...parentBlock.children]
			if (childIndex !== undefined && childIndex > -1) {
				newParentChildren.splice(childIndex, 0, newBlock.id)
			} else {
				newParentChildren.push(newBlock.id)
			}

			return {
				layout: {
					...state.layout,
					[parentBlockID]: {
						...parentBlock,
						children: newParentChildren,
					},
					[newBlock.id]: newBlock,
				},
			}
		}),
}))

// return {
//     layout: {}
// }
