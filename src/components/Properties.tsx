import { useLayout } from '../stores/useLayout'

const Properties: React.FC = () => {
	const selectedBlockID = useLayout((state) => state.selectedBlockID)
	const selectedBlock = useLayout((state) => state.layout[selectedBlockID])
	const updateBlock = useLayout((state) => state.updateBlock)

	if (!selectedBlockID)
		return (
			<div className='h-fill w-[300px] bg-neutral-900 flex-shrink-0 text-neutral-300 p-3'>
				<p>No Block Selected</p>
			</div>
		)

	return (
		<div className='flex flex-col h-fill w-[300px] bg-neutral-900 flex-shrink-0 text-neutral-300 p-3 overflow-auto custom-scrollbar'>
			<textarea
				className='flex-grow rounded bg-neutral-700 text-neutral-100 p-2 text-sm'
				onChange={(e) => updateBlock(selectedBlockID, { tailwind: e.target.value })}
				value={selectedBlock.tailwind}
			/>
		</div>
	)
}

export default Properties
