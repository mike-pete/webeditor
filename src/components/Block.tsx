import { CSSProperties } from 'react'
import { BlockShape } from '../types/global'

const Block: React.FC<{
	id: string
	getBlock: (id: string) => BlockShape | undefined
	setSelectedBlockID: (data: string) => void
	selectedBlockID: string
}> = ({ id, getBlock, setSelectedBlockID, selectedBlockID }) => {
	const { style, children } = getBlock(id) ?? {}

	const handleClick = (event: React.MouseEvent) => {
		event.stopPropagation()
		setSelectedBlockID(id)
	}

	return (
		<div
			className={
				'hide-scrollbar cursor-pointer' +
				` ${
					id === selectedBlockID &&
					'outline outline-4 outline-offset-[-4px] outline-sky-500'
				}`
			}
			style={style as CSSProperties}
			onClick={handleClick}
		>
			{children?.map((id) => (
				<Block {...{ id, getBlock, setSelectedBlockID, selectedBlockID }} key={id} />
			))}
		</div>
	)
}

export default Block
