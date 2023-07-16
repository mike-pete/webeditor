import { useState } from 'react'
import { defaultBlock } from '../constants/const'
import { BlockShape } from '../types/global'
import 'material-symbols'

const Structure: React.FC<{
	selectedBlockID: string
	setSelectedBlockID: (newID: string) => void
	getBlock: (key: string) => BlockShape | undefined
	addChildBlock: (parentBlockID?:string) => void
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
	addChildBlock: (parentBlockID?:string) => void
}> = ({ id, selectedBlockID, setSelectedBlockID, getBlock, addChildBlock }) => {
	const { children } = getBlock(id) ?? defaultBlock

	const [expanded, setExpanded] = useState(true)

	const toggleExpanded = () => {
		setExpanded((prev) => !prev)
	}

	const handleClick = (event: React.MouseEvent) => {
		event.stopPropagation()
		setSelectedBlockID(id)
	}

	return (
		<div onClick={handleClick}>
			<div
				className={`hover:bg-neutral-800 py-0.5 cursor-pointer rounded flex items-center select-none ${
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
				<p className='ml-2'>block</p>
			</div>
			{expanded && (
				<div className='ml-5'>
					{children?.map((id) => (
						<Level {...{ id, selectedBlockID, setSelectedBlockID, getBlock, addChildBlock }} key={id} />
					))}
				</div>
			)}
		</div>
	)
}

export default Structure
