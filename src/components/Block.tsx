import { CSSProperties } from 'react'
import { useLayout } from '../stores/useLayout'

const Block: React.FC<{
	id: string
}> = ({ id }) => {
	const { style, children } = useLayout((state) => state.layout[id])
	const selectedBlockID = useLayout((state) => state.selectedBlockID)
	const setSelectedBlockID = useLayout((state) => state.setSelectedBlockID)

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
				<Block id={id} key={id} />
			))}
		</div>
	)
}

export default Block
