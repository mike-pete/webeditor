import 'material-symbols'
import { useState } from 'react'
import { RootBlockId } from '../constants/const'
import { useLayout } from '../stores/useLayout'

const GenHTML: React.FC<{
	id: string
}> = ({ id }) => {
	const layout = useLayout((state) => state.layout)

	console.log(layout)

	const x = (id: string, level = 1): string => {
		const children = layout[id].children.map((childID) => x(childID, level + 1)) ?? []
		const styles = layout[id].style

		let childString = ``

		const tab = '\t'.repeat(level)

		if (children.length > 0) {
			childString = `\n${tab}${children.join(`\n${tab}`)}\n${'\t'.repeat(level-1)}`
		}
		

		return `<div style={${JSON.stringify(styles)}}>${childString}</div>`
	}

	// console.log(x(id))

	return <p className='whitespace-pre-wrap'>{x(id)}</p>
}

const Hierarchy: React.FC = () => {
	return (
		<div className='h-fill w-[300px] bg-neutral-900 flex-shrink-0 text-neutral-300 p-1 overflow-auto custom-scrollbar'>
			<Level id={RootBlockId} />
			<GenHTML id={RootBlockId} />
		</div>
	)
}

const Level: React.FC<{
	id: string
}> = ({ id }) => {
	const children = useLayout((state) => state.layout[id].children)
	const addChildBlock = useLayout((state) => state.addChildBlock)
	const selectedBlockID = useLayout((state) => state.selectedBlockID)
	const setSelectedBlockID = useLayout((state) => state.setSelectedBlockID)
	const deepDeleteBlock = useLayout((state) => state.deepDeleteBlock)
	const deepDuplicateBlock = useLayout((state) => state.deepDuplicateBlock)

	const [expanded, setExpanded] = useState(true)

	if (!children) {
		return null
	}

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
						className={`material-symbols-outlined cursor-pointer ${!expanded && 'rotate-[-90deg]'}`}
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
						<Level id={id} key={id} />
					))}
				</div>
			)}
		</div>
	)
}

export default Hierarchy
