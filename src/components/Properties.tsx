import { useLayout } from '../stores/useLayout'
import { ComponentShape } from '../types/global'

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

	const hasClassName = selectedBlock?.props?.className

	if (hasClassName !== undefined) {
		return (
			<div className='flex flex-col h-fill w-[300px] bg-neutral-900 flex-shrink-0 text-neutral-300 p-3 overflow-auto custom-scrollbar'>
				<textarea
					className='flex-grow rounded bg-neutral-700 text-neutral-100 p-2 text-sm'
					onChange={(e) =>
						updateBlock(selectedBlockID, {
							props: { className: e.target.value },
						} as Partial<ComponentShape>)
					}
					value={selectedBlock.props.className}
				/>
			</div>
		)
	}

	return null
}

export default Properties
