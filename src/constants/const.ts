import {
	ALIGN_CONTENT_OPTIONS,
	ALIGN_ITEMS_OPTIONS,
	BlockShape,
	DISPLAY_OPTIONS,
	FLEX_DIRECTION_OPTIONS,
	FLEX_WRAP_OPTIONS,
	JUSTIFY_CONTENT_OPTIONS,
} from '../types/global'
import { BaseStyle } from '../types/global'

export const defaultBlockStyle: BaseStyle = {
	background: 'rgba(156, 163, 175, 0.5)',
	minWidth: '50px',
	minHeight: '50px',
	maxHeight: '',
	maxWidth: '',
	width: '',
	height: '',
	padding: '10px',
	margin: '',
	borderRadius: '4px',
	overflow: 'auto',
	flexShrink: '0',
	flexGrow: '0',
	display: 'block',
}

export const defaultBlock: BlockShape = {
	id: '',
	style: defaultBlockStyle,
	children: [],
	parent: '',
}

export const defaultRootStyle = {
	justifyContent: 'flex-start',
	background: 'white',
	height: '100%',
	width: '100%',
	margin: '0',
	overflow: 'auto',
	display: 'flex',
	flexDirection: 'column',
	gap: '20px',
	padding: '20px',
}

export const StyleInputTypes: Record<string, string | string[]> = {
	display: DISPLAY_OPTIONS,
	minHeight: 'string',
	minWidth: 'string',
	width: 'string',
	height: 'string',
	maxWidth: 'string',
	maxHeight: 'string',
	margin: 'string',
	padding: 'string',
	background: 'string',
	overflow: 'string',
	borderRadius: 'string',
	flexShrink: 'number',
	flexGrow: 'number',
	flexDirection: FLEX_DIRECTION_OPTIONS,
	flexWrap: FLEX_WRAP_OPTIONS,
	justifyContent: JUSTIFY_CONTENT_OPTIONS,
	alignItems: ALIGN_ITEMS_OPTIONS,
	alignContent: ALIGN_CONTENT_OPTIONS,
	gap: 'string',
}

export const RootBlockId = 'root'
