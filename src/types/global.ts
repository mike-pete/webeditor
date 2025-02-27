export type ChildID = string

export type Div = {
	type: 'div'
	props: {
		children: ChildID[]
		className?: string
	}
}

export type P = {
	type: 'p'
	props: {
		text: string
		className?: string
	}
}

export type ComponentShape = {
	id: string
	parent: string
	props?: object
} & (Div | P)

const example: ComponentShape = {
	id: 'root',
	parent: '',
	props: {
		className: 'flex flex-col min-h-screen',
		children: [],
	},
	type: 'div',
}

console.log(example)
