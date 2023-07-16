import { useState } from 'react'
import { defaultBlock } from '../constants/const'
import { BlockShape } from '../types/global'
import 'material-symbols'

const Structure: React.FC<{
	selectedBlockID: string
	setSelectedBlockID: (newID: string) => void
	getBlock: (key: string) => BlockShape | undefined
	addChildBlock: (
		parentBlockID?: string,
		childIndex?: number,
		block?: Partial<BlockShape>
	) => void
}> = (props) => {
	return (
		<div className='h-fill w-[300px] bg-neutral-900 flex-shrink-0 text-neutral-300 p-1'>
			<Level id='root' {...props} />
		</div>
	)
}

const Level: React.FC<{
	id: string
	selectedBlockID: string
	setSelectedBlockID: (newID: string) => void
	getBlock: (key: string) => BlockShape | undefined
	addChildBlock: (
		parentBlockID?: string,
		childIndex?: number,
		block?: Partial<BlockShape>
	) => void
}> = ({ id, selectedBlockID, setSelectedBlockID, getBlock, addChildBlock }) => {
	const blockData = getBlock(id) ?? defaultBlock
	const { children, parent } = blockData

	const [expanded, setExpanded] = useState(true)

	const toggleExpanded = () => {
		setExpanded((prev) => !prev)
	}

	const handleClick = (event: React.MouseEvent) => {
		event.stopPropagation()
		setSelectedBlockID(id)
	}

	const parentBlock = getBlock(parent)

	const duplicate = () => {
		const currentBlockChildPosition =
			parentBlock?.children.findIndex((currBlockID) => currBlockID === id) ?? 0

		const newBlockData = { ...blockData, children: [] }
		addChildBlock(parent, currentBlockChildPosition + 1, newBlockData)
	}

	return (
		<div onClick={handleClick}>
			<div
				className={`hover:bg-neutral-800 py-0.5 pr-2 cursor-pointer rounded flex items-center select-none group ${
					id == selectedBlockID && '!bg-neutral-700'
				}`}
			>
				{children.length > 0 ? (
					<span
						className={`material-symbols-outlined cursor-pointer ${
							!expanded && 'rotate-[-90deg]'
						}`}
						onClick={toggleExpanded}
					>
						arrow_drop_down
					</span>
				) : (
					<span className='w-[24px]'></span>
				)}

				<span className='material-symbols-outlined text-xs'>
					{children.length ? 'view_comfy_alt' : 'square'}
				</span>
				<p className='ml-2 flex-grow'>block</p>
				{id !== 'root' && (
					<span
						className='material-symbols-outlined text-sm hidden group-hover:block'
						onClick={duplicate}
					>
						copy_all
					</span>
				)}
			</div>
			{expanded && (
				<div className='ml-5'>
					{children?.map((id) => (
						<Level
							{...{
								id,
								selectedBlockID,
								setSelectedBlockID,
								getBlock,
								addChildBlock,
							}}
							key={id}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export default Structure
