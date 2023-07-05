export type Block = {
	id: string
	style?: Style | (Style & FlexContainer)
	children: Block[]
}

export type Style = {
	minHeight?: string
	minWidth?: string
	width?: string
	height?: string
	margin?: string
	padding?: string
	background?: string
	overflow?: string
	flexShrink?: number
	flexGrow?: number
}

export type FlexContainer = {
	display: 'flex'
	flexDirection?: 'row' | 'column'
	flexWrap?: 'nowrap' | 'wrap'
	justifyContent?:
		| 'flex-start'
		| 'flex-end'
		| 'center'
		| 'space-between'
		| 'space-around'
		| 'space-evenly'
	alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
	alignContent?:
		| 'flex-start'
		| 'flex-end'
		| 'center'
		| 'space-between'
		| 'space-around'
		| 'stretch'
	gap?: string
}