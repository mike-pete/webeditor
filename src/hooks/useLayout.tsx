import { useState } from 'react'
import { BlockShape } from '../types/global'
import { defaultBlockStyle, defaultRootStyle } from '../constants/const'

const useLayout = () => {
	const [selectedBlockID, setSelectedBlockID] = useState<string>('root')

	const [layout, setLayout] = useState(
		() =>
			new Map<string, BlockShape>([
				['root', { id: 'root', style: defaultRootStyle, children: [] }],
			])
	)

	const addBlock = async (block?: BlockShape): Promise<string> => {
		const newBlockKey = `${Math.random()}`
		await setLayout((oldLayout) => {
			const newLayout = new Map(
				oldLayout.set(newBlockKey, {
					id: newBlockKey,
					style: defaultBlockStyle,
					children: [],
					...block,
				})
			)
			return newLayout
		})
		return newBlockKey
	}

	const addChildBlock = async (parentBlockID?:string) => {
		const newBlockID = await addBlock()
		const newBlock = getBlock(newBlockID)

		if (newBlock) {
			const parentBlock = getBlock(parentBlockID ?? selectedBlockID)
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

	const updateBlock = async (key: string, block: BlockShape) => {
		await setLayout((oldLayout) => {
			const newLayout = new Map(oldLayout.set(key, block))
			return newLayout
		})
	}

	return { addChildBlock, getBlock, updateBlock, selectedBlockID, setSelectedBlockID }
}

export default useLayout
