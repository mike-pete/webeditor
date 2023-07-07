import { BlockShape } from '../types/global'

const Block: React.FC<{
	id: string
	getBlock: (id: string) => BlockShape | undefined
	select: (data: string) => void
	selectedID: string
}> = ({ id, getBlock, select, selectedID }) => {
	const { style, children } = getBlock(id) ?? {}

	const handleClick = (event: React.MouseEvent) => {
		event.stopPropagation()
		select(id)
	}

	return (
		<div
			className={
				'hide-scrollbar cursor-pointer' +
				` ${
					id === selectedID &&
					'outline outline-4 outline-offset-[-4px] outline-sky-500'
				}`
			}
			style={style}
			onClick={handleClick}
		>
			{children?.map((id) => (
				<Block {...{ id, getBlock, select, selectedID }} key={Math.random()} />
			))}
		</div>
	)
}

export default Block
