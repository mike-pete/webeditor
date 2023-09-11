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
		parentBlockID?: string,
		childIndex?: number,
		block?: Partial<BlockShape>
	) => void
	updateBlock: (id: string, block: Partial<BlockShape>) => void
	traverseBlockAndAllChildBlocks: (
		id: string,
		callback?: (block: BlockShape) => void
	) => void
	deepDeleteBlock: (blockID: string) => void
	deepDuplicateBlock: (blockID: string) => void
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
	addChildBlock: (parentBlockID, childIndex, block) => {
		// make sure parent block is valid
		const selectedBlockID = get().selectedBlockID
		parentBlockID = parentBlockID ?? selectedBlockID
		const parentBlock = get().layout[parentBlockID]

		if (!parentBlock) {
			console.error(`block [${parentBlockID}] not found`)
			return
		}

		const newBlock = createNewBlock({ ...block, parent: parentBlockID })

		// insert new block id into parent's children array
		const newParentChildren = [...parentBlock.children]
		if (childIndex !== undefined && childIndex > -1) {
			newParentChildren.splice(childIndex, 0, newBlock.id)
		} else {
			newParentChildren.push(newBlock.id)
		}

		set((state) => ({
			layout: {
				...state.layout,
				[newBlock.id]: newBlock,
				[parentBlockID as string]: {
					...parentBlock,
					children: newParentChildren,
				},
			},
		}))
	},
	updateBlock: (id, block) =>
		set((state) => ({
			layout: {
				...state.layout,
				[id]: {
					...state.layout[id],
					...block,
				},
			},
		})),
	// breadth-first traversal of block and all its children
	traverseBlockAndAllChildBlocks: (id, callback) => {
		const toTraverse = new Set([id])

		while (toTraverse.size > 0) {
			const currentBlockID = toTraverse.values().next().value
			toTraverse.delete(currentBlockID)

			const currentBlock = get().layout[currentBlockID]
			if (currentBlock) {
				currentBlock.children.forEach((childID) => {
					toTraverse.add(childID)
				})
				callback?.(currentBlock)
			}
		}
	},
	deepDeleteBlock: (id: string) => {
		const block = get().layout[id]
		let selectedBlockID = get().selectedBlockID

		// create a new layout and remove sub-blocks
		const newLayout = get().layout
		get().traverseBlockAndAllChildBlocks(id, (block) => {
			delete newLayout[block.id]
		})

		if (block?.parent) {
			if (newLayout[block.parent]) {
				// remove block from parent's children array
				newLayout[block.parent].children = newLayout[
					block.parent
				].children.filter((childID) => childID !== id)
			}
		}

		// if the selected block was deleted select a new block
		if (!(selectedBlockID in newLayout)) {
			selectedBlockID = block?.parent ?? RootBlockId
		}

		set(() => ({
			selectedBlockID,
			layout: newLayout,
		}))
	},
	deepDuplicateBlock: (id: string) => {
		const block = get().layout[id]
		const parentBlockID = block?.parent ?? RootBlockId

		const originalIDtoNewID = new Map<string, string>([
			[parentBlockID, parentBlockID],
		])
		const newBlocks = new Map<string, BlockShape>()

		// duplicate blocks
		get().traverseBlockAndAllChildBlocks(id, (block) => {
			const parentID = originalIDtoNewID.get(block.parent) ?? RootBlockId
			const parent = newBlocks.get(parentID)

			const newBlock = createNewBlock({
				...block,
				parent: parentID,
				children: [],
			})

			originalIDtoNewID.set(block.id, newBlock.id)

			if (parent) {
				parent.children.push(newBlock.id)
			}

			newBlocks.set(newBlock.id, newBlock)
		})

		const parentBlock = get().layout[parentBlockID]
		const duplicatedBlockID = originalIDtoNewID.get(id)

		if (parentBlock && duplicatedBlockID) {
			set(() => {
				const newLayout = get().layout

				// insert duplicated block at correct position in parent's children
				const newChildren = [...parentBlock.children]
				const insertionIndex = newChildren.findIndex(
					(childId) => childId === id
				)

				if (insertionIndex !== -1) {
					newChildren.splice(insertionIndex + 1, 0, duplicatedBlockID)
				} else {
					newChildren.push(duplicatedBlockID)
				}

				newLayout[parentBlockID] = {
					...parentBlock,
					children: newChildren,
				}

				// insert new blocks into layout
				newBlocks.forEach((block) => {
					newLayout[block.id] = block
				})

				return {
					layout: newLayout,
				}
			})
		}
	},
}))
