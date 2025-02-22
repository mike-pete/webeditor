import { RootBlockId } from '../constants/const'
import { ComponentShape } from '../types/global'

const initialLayout: Record<string, ComponentShape> = {
	[RootBlockId]: {
		id: RootBlockId,
		children: ['0.7335196799845918', '0.07379758453313534'],
		parent: '',
		tailwind:
			'min-w-[50px] min-h-[50px] w-full h-full p-5 m-0 rounded overflow-auto flex-shrink-0 flex-grow-0 flex justify-start flex-col gap-2',
	},
	'0.7335196799845918': {
		children: ['0.23882860876642287', '0.7602502020753199'],
		parent: 'root',
		id: '0.7335196799845918',
		tailwind:
			'min-w-[50px] min-h-[50px] rounded overflow-auto flex-shrink-0 flex-grow-0 flex gap-2',
	},
	'0.07379758453313534': {
		tailwind:
			'bg-gray-400/50 min-w-[50px] min-h-[50px] p-2.5 rounded overflow-auto flex-shrink-0 flex-grow block',
		children: [],
		parent: 'root',
		id: '0.07379758453313534',
	},
	'0.23882860876642287': {
		children: [],
		parent: '0.7335196799845918',
		id: '0.23882860876642287',
		tailwind:
			'bg-gray-400/50 min-w-[50px] min-h-[50px] p-2.5 rounded-full overflow-auto flex-shrink-0 flex-grow-0 block',
	},
	'0.7602502020753199': {
		tailwind:
			'bg-gray-400/20 p-2.5 rounded overflow-auto flex-shrink-0 flex-grow flex gap-2 justify-end',
		children: ['0.9685332190176628', '0.5148592161328003'],
		parent: '0.7335196799845918',
		id: '0.7602502020753199',
	},
	'0.9685332190176628': {
		tailwind:
			'bg-gray-400/50 w-[100px] p-2.5 rounded overflow-auto flex-shrink-0 flex-grow-0 block',
		children: [],
		parent: '0.7602502020753199',
		id: '0.9685332190176628',
	},
	'0.5148592161328003': {
		tailwind:
			'bg-gray-400/50 w-[100px] p-2.5 rounded overflow-auto flex-shrink-0 flex-grow-0 block',
		children: [],
		parent: '0.7602502020753199',
		id: '0.5148592161328003',
	},
}

export default initialLayout
