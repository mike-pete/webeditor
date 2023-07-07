import { FlexContainer, BaseStyle } from '../types/Block'

export const defaultBlockStyle: BaseStyle = {
	background: 'rgba(156, 163, 175, 0.5)',
	width: '100px',
	minHeight: '100px',
	padding: '10px',
	margin: '10px',
	borderRadius: '0.375rem',
}

export const defaultRootStyle: BaseStyle & FlexContainer = {
	background: 'white',
	height: '100%',
	width: '100%',
	margin: '0',
	overflow: 'auto',
	display: 'flex',
	flexDirection: 'column',
}

export const StyleInputs: Record<string, string> = {
	display: 'string',
	minHeight: 'string',
	minWidth: 'string',
	width: 'string',
	height: 'string',
	margin: 'string',
	padding: 'string',
	background: 'string',
	overflow: 'string',
	borderRadius: 'string',
	// flexShrink: number,
	// flexGrow?: number,
}

export const FlexContainerInputs: Record<string, string | string[]> = {
	display: 'flex',
	flexDirection: ['row', 'column'],
	flexWrap: ['nowrap', 'wrap'],
	justifyContent: [
		'flex-start',
		'flex-end',
		'center',
		'space-between',
		'space-around',
		'space-evenly',
	],
	alignItems: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
	alignContent: [
		'flex-start',
		'flex-end',
		'center',
		'space-between',
		'space-around',
		'stretch',
	],
	gap: 'string',
}
