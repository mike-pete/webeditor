import { FlexContainerInputs, StyleInputs } from '../constants/const'
import { BlockShape, Style } from '../types/Block'

const SideBar: React.FC<{
	selectedBlockID: string
	addBlock: (block?: BlockShape) => Promise<string>
	getBlock: (key: string) => BlockShape | undefined
	updateBlock: (key: string, block: BlockShape) => void
}> = ({ selectedBlockID, addBlock, getBlock, updateBlock }) => {
	const addChildBlock = async () => {
		const newBlockID = await addBlock()
		const newBlock = getBlock(newBlockID)

		if (newBlock) {
			const selectedBlock = getBlock(selectedBlockID)
			if (!selectedBlock) {
				console.error(`block [${selectedBlockID}] not found`)
				return
			}
			updateBlock(selectedBlockID, {
				...selectedBlock,
				id: selectedBlockID,
				children: [...(selectedBlock?.children ?? []), newBlockID],
			})
		}
	}

	const updateStyle = (property: string, value: string) => {
		updateBlock(selectedBlockID, {
			id: selectedBlockID,
			children: children ?? [],
			style: { ...style, [property]: value },
		})
	}

	const { style, children } = getBlock(selectedBlockID) ?? {}

	if (!selectedBlockID)
		return (
			<div className='h-fill w-[300px] bg-neutral-900 flex-shrink-0 text-neutral-300 p-3'>
				<p>No Block Selected</p>
			</div>
		)

	return (
		<div className='h-fill w-[300px] bg-neutral-900 flex-shrink-0 text-neutral-300 p-3 overflow-auto custom-scrollbar'>
			<p>Settings</p>
			<button onClick={addChildBlock}>+ Child Block</button>
			{Object.entries(StyleInputs).map(([key, value]) => {
				return (
					<Input
						key={key}
						property={key}
						value={style?.[key as keyof Style]}
						updateStyle={updateStyle}
					/>
				)
			})}
			{style?.display === 'flex' &&
				Object.entries(FlexContainerInputs).map(([key, value]) => {
					return (
						<Input
							key={key}
							property={key}
							value={style?.[key as keyof Style]}
							updateStyle={updateStyle}
						/>
					)
				})}
		</div>
	)
}

const Input: React.FC<{
	property: string
	value: Style[keyof Style]
	updateStyle: (property: string, value: string) => void
}> = ({ property, value, updateStyle }) => {
	return (
		<div className='flex flex-col my-2'>
			<label
				htmlFor={property}
				className='text-xs font-semibold px-1 pt-1 pb-0.5'
			>
				{property}
			</label>
			<input
				id={property}
				className='py-1 px-2 rounded text-neutral-100 bg-neutral-700 text-xs'
				type='text'
				value={value}
				onChange={(e) => updateStyle(property, e.target.value)}
			/>
		</div>
	)
}

export default SideBar
