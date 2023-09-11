import { useState } from 'react'
import { RootBlockId } from '../constants/const'
import 'material-symbols'
import { useLayout } from '../stores/useLayout'

const Structure: React.FC<{
	deepDeleteBlock: (blockID: string) => void
	deepDuplicateBlock: (blockID: string) => void
}> = (props) => {
	return (
		<div className='h-fill w-[300px] bg-neutral-900 flex-shrink-0 text-neutral-300 p-1 overflow-auto custom-scrollbar'>
			<Level id={RootBlockId} {...props} />
		</div>
	)
}

const Level: React.FC<{
	id: string
	deepDeleteBlock: (blockID: string) => void
	deepDuplicateBlock: (blockID: string) => void
}> = (props) => {
	const { id, deepDeleteBlock, deepDuplicateBlock } = props

	const addChildBlock = useLayout((state) => state.addChildBlock)
	const blockData = useLayout((state) => state.layout[id])
	const selectedBlockID = useLayout((state) => state.selectedBlockID)
	const setSelectedBlockID = useLayout((state) => state.setSelectedBlockID)

	const { children } = blockData

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
				<span
					className='material-symbols-outlined text-sm hidden group-hover:block'
					onClick={(event) => {
						event.stopPropagation()
						addChildBlock(id)
					}}
				>
					add
				</span>
				{id !== RootBlockId && (
					<>
						<span
							className='material-symbols-outlined text-sm hidden group-hover:block'
							onClick={(event) => {
								event.stopPropagation()
								deepDuplicateBlock(id)
							}}
						>
							copy_all
						</span>
						<span
							className='material-symbols-outlined text-sm hidden group-hover:block'
							onClick={(event) => {
								event.stopPropagation()
								deepDeleteBlock(id)
							}}
						>
							delete
						</span>
					</>
				)}
			</div>
			{expanded && (
				<div className='ml-5'>
					{children?.map((id) => (
						<Level {...{ ...props, id }} key={id} />
					))}
				</div>
			)}
		</div>
	)
}

export default Structure
