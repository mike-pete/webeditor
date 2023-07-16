export type BlockShape = {
	id: string
	style?: Style
	children: string[]
	parent: string
}

export type Style = BaseStyle | (BaseStyle & FlexContainer)

export type BaseStyle = {
	minHeight: string
	minWidth: string
	width: string
	height: string
	maxWidth: string
	maxHeight: string
	margin: string
	padding: string
	background: string
	overflow: string
	borderRadius: string
	flexShrink: number
	flexGrow: number
	display: typeof DISPLAY_OPTIONS[number]
}

export const DISPLAY_OPTIONS = ['block','flex',]

export const FLEX_DIRECTION_OPTIONS = ['row', 'column']

export const FLEX_WRAP_OPTIONS = ['nowrap', 'wrap']

export const JUSTIFY_CONTENT_OPTIONS = [
	'flex-start',
	'flex-end',
	'center',
	'space-between',
	'space-around',
	'space-evenly',
]

export const ALIGN_ITEMS_OPTIONS = [
	'flex-start',
	'flex-end',
	'center',
	'baseline',
	'stretch',
]

export const ALIGN_CONTENT_OPTIONS = [
	'flex-start',
	'flex-end',
	'center',
	'space-between',
	'space-around',
	'stretch',
]

export type FlexContainer = {
	display: 'flex'
	flexDirection?: typeof FLEX_DIRECTION_OPTIONS[number]
	flexWrap?: typeof FLEX_WRAP_OPTIONS[number]
	justifyContent?: typeof JUSTIFY_CONTENT_OPTIONS[number]
	alignItems?: typeof ALIGN_ITEMS_OPTIONS[number]
	alignContent?: typeof ALIGN_CONTENT_OPTIONS[number]
	gap?: string
}
