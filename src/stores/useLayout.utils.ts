import { ComponentShape } from '../types/global'

export const generateBlockID = () => Math.random().toString()

const defaultBlockClassName =
	'min-w-[50px] min-h-[50px] p-[10px] rounded-md overflow-auto flex-shrink-0 flex-grow-0 display-block bg-gray-400/50'

export const createNewBlock = (block?: Partial<ComponentShape>): ComponentShape => {
	const newBlockKey = generateBlockID()
	return {
		children: [],
		parent: '',
		...block,
		id: newBlockKey,
		tailwind: defaultBlockClassName,
	}
}
