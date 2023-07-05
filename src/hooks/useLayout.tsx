import { useState } from 'react'
import { Block } from '../types/Block'
import { defaultBlockStyle, defaultRootStyle } from '../constants/const'

const useLayout = () => {
	const [layout, setLayout] = useState(
		() =>
			new Map<string, Block>([
				['root', { id: 'root', style: defaultRootStyle, children: [] }],
			])
	)

	const addBlock = async (block?: Block): Promise<string> => {
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

	const getBlock = (key: string): Block | undefined => {
		return layout.get(key)
	}

	const updateBlock = async (key: string, block: Block) => {
		await setLayout((oldLayout) => {
			const newLayout = new Map(oldLayout.set(key, block))
			return newLayout
		})
	}

	return { addBlock, getBlock, updateBlock }
}

export default useLayout
