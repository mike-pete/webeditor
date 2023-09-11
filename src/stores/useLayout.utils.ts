import { defaultBlockStyle } from '../constants/const'
import { BlockShape } from '../types/global'

export const generateBlockID = () => Math.random().toString()

export const createNewBlock = (block?: Partial<BlockShape>): BlockShape => {
	const newBlockKey = generateBlockID()
	return {
		style: defaultBlockStyle,
		children: [],
		parent: '',
		...block,
		id: newBlockKey,
	}
}
