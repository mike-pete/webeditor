import { FlexContainer, Style } from "../types/Block"

export const defaultBlockStyle: Style = {
	background: 'rgba(156, 163, 175, 0.5)',
	width: '100px',
	minHeight: '100px',
	padding: '10px',
	margin: '10px',
}

export const defaultRootStyle: Style & FlexContainer = {
    background: 'white',
	height: '100%',
	width: '100%',
	margin: '0',
	overflow: 'auto',
	display: 'flex',
	flexDirection: 'column',
}

