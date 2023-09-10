import { useState } from 'react'
import { BlockShape } from '../types/global'
import {
	RootBlockId,
	defaultBlock,
	defaultBlockStyle,
	defaultRootStyle,
} from '../constants/const'
import useSelectedBlockID from '../stores/useSelectedBlockID'

const generateBlockID = () => Math.random().toString()

const createNewBlock = (block?: Partial<BlockShape>): BlockShape => {
	const newBlockKey = generateBlockID()
	return {
		style: defaultBlockStyle,
		children: [],
		parent: '',
		...block,
		id: newBlockKey,
	}
}

const useLayout = () => {
	const selectedBlockID = useSelectedBlockID((state) => state.selectedBlockID)
	const setSelectedBlockID = useSelectedBlockID(
		(state) => state.setSelectedBlockID
	)

	const [layout, setLayout] = useState(
		() =>
			new Map<string, BlockShape>([
				[
					RootBlockId,
					{
						id: RootBlockId,
						style: defaultRootStyle,
						children: [],
						parent: '',
					},
				],
			])
	)

	const addChildBlock = async (
		parentBlockID: string = selectedBlockID,
		childIndex?: number,
		block?: Partial<BlockShape>
	) => {
		// make sure parent block is valid
		const parentBlock = getBlock(parentBlockID)
		if (!parentBlock) {
			console.error(`block [${parentBlockID}] not found`)
			return
		}

		// create new block
		const newBlock = createNewBlock(block)
		setLayout((layout) => new Map(layout.set(newBlock.id, newBlock)))

		// insert new block id into parent's children array
		const newChildren = [...parentBlock.children]
		if (childIndex !== undefined && childIndex > -1) {
			newChildren.splice(childIndex, 0, newBlock.id)
		} else {
			newChildren.push(newBlock.id)
		}

		// save changes to parent block
		updateBlock(parentBlockID, {
			children: newChildren,
		})
	}

	const getBlock = (key: string): BlockShape | undefined => {
		return layout.get(key)
	}

	const updateBlock = (id: string, block: Partial<BlockShape>) => {
		setLayout((layout) => {
			const oldBlock = layout.get(id)
			return new Map(layout.set(id, { ...defaultBlock, ...oldBlock, ...block }))
		})
	}

	// breadth-first traversal of block and all its children
	const traverseBlockAndAllChildBlocks = async (
		parentID: string,
		callback?: (block: BlockShape) => void
	) => {
		const toTraverse = new Set([parentID])

		while (toTraverse.size > 0) {
			const currentBlockID = toTraverse.values().next().value
			toTraverse.delete(currentBlockID)

			const currentBlock = getBlock(currentBlockID)
			if (currentBlock) {
				currentBlock.children.forEach((childID) => {
					toTraverse.add(childID)
				})
				callback?.(currentBlock)
			}
		}
	}

	const deepDeleteBlock = (blockID: string) => {
		const block = getBlock(blockID)

		// if block is selected, select parent block or root
		if (selectedBlockID === blockID) {
			setSelectedBlockID(block?.parent ?? RootBlockId)
		}

		// remove block from parent's children array
		if (block?.parent) {
			const parentBlock = getBlock(block.parent)
			if (parentBlock) {
				const newChildren = parentBlock.children.filter(
					(childID) => childID !== blockID
				)
				updateBlock(parentBlock.id, { children: newChildren })
			}
		}

		// create a list of all blocks to delete
		const children: string[] = []
		traverseBlockAndAllChildBlocks(blockID, (block) => {
			children.push(block.id)
		})

		// delete all blocks in list
		setLayout((layout) => {
			const newLayout = new Map(layout)
			children.forEach((childID) => {
				newLayout.delete(childID)
			})
			return newLayout
		})
	}

	const deepDuplicateBlock = (blockID: string) => {
		const block = getBlock(blockID)
		const parentBlockID = block?.parent ?? RootBlockId

		const originalIDtoNewID = new Map<string, string>([
			[parentBlockID, parentBlockID],
		])
		const newBlocks = new Map<string, BlockShape>()

		// duplicate blocks
		traverseBlockAndAllChildBlocks(blockID, (block) => {
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

		const parentBlock = getBlock(parentBlockID)
		const duplicatedBlockID = originalIDtoNewID.get(blockID)

		if (parentBlock && duplicatedBlockID) {
			setLayout((layout) => {
				const newLayout = new Map(layout)

				// insert duplicated block at correct position in parent's children
				const newChildren = [...parentBlock.children]
				const insertionIndex = newChildren.findIndex((id) => id === blockID)

				if (insertionIndex !== -1) {
					newChildren.splice(insertionIndex + 1, 0, duplicatedBlockID)
				} else {
					newChildren.push(duplicatedBlockID)
				}

				newLayout.set(parentBlockID, {
					...parentBlock,
					children: newChildren,
				})

				// insert new blocks into layout
				newBlocks.forEach((block) => {
					newLayout.set(block.id, block)
				})

				return newLayout
			})
		}
	}

	return {
		addChildBlock,
		getBlock,
		updateBlock,
		selectedBlockID,
		setSelectedBlockID,
		deepDeleteBlock,
		deepDuplicateBlock,
	}
}

export default useLayout
