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

	const addBlock = async (block?: Partial<BlockShape>) => {
		const newBlockKey = `${Math.random()}`
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
			if (childIndex !== undefined) {
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

	return {
		addChildBlock,
		getBlock,
		updateBlock,
		selectedBlockID,
		setSelectedBlockID,
		deepDeleteBlock,
	}
}

export default useLayout
