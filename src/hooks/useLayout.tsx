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

	const addBlock = async (block?: Partial<BlockShape>): Promise<string> => {
		const newBlockKey = `${Math.random()}`
		await setLayout((oldLayout) => {
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

	const addChildBlock = async (parentBlockID?: string) => {
		parentBlockID = parentBlockID ?? selectedBlockID
		const newBlockID = await addBlock({ parent: parentBlockID })
		const newBlock = getBlock(newBlockID)

		if (newBlock) {
			const parentBlock = getBlock(parentBlockID)
			if (!parentBlock) {
				console.error(`block [${selectedBlockID}] not found`)
				return
			}
			updateBlock(selectedBlockID, {
				...parentBlock,
				id: selectedBlockID,
				children: [...parentBlock.children, newBlockID],
			})
		}
	}

	const getBlock = (key: string): BlockShape | undefined => {
		return layout.get(key)
	}

	const updateBlock = (key: string, block: Partial<BlockShape>) => {
		setLayout((oldLayout) => {
			const oldBlock = oldLayout.get(key)
			const newLayout = new Map(
				oldLayout.set(key, { ...defaultBlock, ...oldBlock, ...block })
			)
			return newLayout
		})
	}

	return {
		addChildBlock,
		getBlock,
		updateBlock,
		selectedBlockID,
		setSelectedBlockID,
	}
}

export default useLayout
