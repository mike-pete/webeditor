import { useState } from 'react'
import { BlockShape } from '../types/global'
import {
	defaultBlock,
	defaultBlockStyle,
	defaultRootStyle,
} from '../constants/const'

const useLayout = () => {
	const [selectedBlockID, setSelectedBlockID] = useState<string>('root')

	const [layout, setLayout] = useState(
		() =>
			new Map<string, BlockShape>([
				[
					'root',
					{ id: 'root', style: defaultRootStyle, children: [], parent: '' },
				],
			])
	)

	const generateBlockID = () => Math.random().toString()

	const addBlock = async (block?: Partial<BlockShape>) => {
		const newBlockKey = generateBlockID()
		setLayout((oldLayout) => {
			const newLayout = new Map(
				oldLayout.set(newBlockKey, {
					id: newBlockKey,
					style: defaultBlockStyle,
					children: [],
					parent: '',
					...block,
				})
			)
			return newLayout
		})
		return newBlockKey
	}

	const addChildBlock = async (
		parentBlockID?: string,
		childIndex?: number,
		block?: Partial<BlockShape>
	) => {
		parentBlockID = parentBlockID ?? selectedBlockID
		const newBlockID = await addBlock({ parent: parentBlockID, ...block })
		const newBlock = getBlock(newBlockID)

		if (newBlock) {
			const parentBlock = getBlock(parentBlockID)
			if (!parentBlock) {
				console.error(`block [${selectedBlockID}] not found`)
				return
			}

			const newChildren = [...parentBlock.children]
			if (childIndex !== undefined && childIndex > -1) {
				newChildren.splice(childIndex, 0, newBlockID)
			} else {
				newChildren.push(newBlockID)
			}

			updateBlock(parentBlockID, {
				children: newChildren,
			})
		}
	}

	const getBlock = (key: string): BlockShape | undefined => {
		return layout.get(key)
	}

	const updateBlock = (id: string, block: Partial<BlockShape>) => {
		setLayout((oldLayout) => {
			const oldBlock = oldLayout.get(id)
			const newLayout = new Map(
				oldLayout.set(id, { ...defaultBlock, ...oldBlock, ...block })
			)
			return newLayout
		})
	}

	const traverseAllChildrenBlocks = async (
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

		setSelectedBlockID((currSelected) => {
			if (currSelected === blockID) {
				return block?.parent ?? 'root'
			}
			return currSelected
		})

		if (block?.parent) {
			const parentBlock = getBlock(block.parent)
			if (parentBlock) {
				const newChildren = parentBlock.children.filter(
					(childID) => childID !== blockID
				)
				updateBlock(parentBlock.id, { children: newChildren })
			}
		}

		const children: string[] = []

		traverseAllChildrenBlocks(blockID, (block) => {
			children.push(block.id)
		})

		setLayout((oldLayout) => {
			children.forEach((childID) => {
				oldLayout.delete(childID)
			})
			return oldLayout
		})
	}

	const deepDuplicateBlock = (blockID: string) => {
		const block = getBlock(blockID)
		const parentBlockID = block?.parent ?? 'root'

		const originalIDtoNewID = new Map<string, string>([
			[parentBlockID, parentBlockID],
		])
		const newBlocks = new Map<string, BlockShape>()

		// duplicate blocks
		traverseAllChildrenBlocks(blockID, (block) => {
			const newBlockID = generateBlockID()
			originalIDtoNewID.set(block.id, newBlockID)

			const parentID = originalIDtoNewID.get(block.parent) ?? 'root'
			const parent = newBlocks.get(parentID)

			if (parent) {
				parent.children.push(newBlockID)
			}

			newBlocks.set(newBlockID, {
				...block,
				parent: parentID,
				children: [],
				id: newBlockID,
			})
		})

		const parentBlock = getBlock(parentBlockID)
		const duplicatedBlockID = originalIDtoNewID.get(blockID)

		if (parentBlock && duplicatedBlockID) {
			setLayout((oldLayout) => {
				const newLayout = new Map(oldLayout)

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
