export type BlockShape = {
	id: string
	style?: Style
	children: string[]
}

export type Style = BaseStyle | (BaseStyle & FlexContainer)

export type BaseStyle = {
	minHeight: string
	minWidth: string
	width: string
	height: string
	margin: string
	padding: string
	background: string
	overflow: string
	borderRadius: string
	flexShrink: number
	flexGrow: number
	display: 'flex' | ''
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
