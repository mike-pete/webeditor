import { useMemo } from 'react'
import {
	FlexContainerInputs,
	StyleInputs,
	defaultBlockStyle,
} from '../constants/const'
import { BlockShape, Style } from '../types/global'

const Properties: React.FC<{
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

	const updateStyle = (property: string, value: string | number) => {
		const newStyle: Style = {
			...defaultBlockStyle,
			...style,
			[property]: value,
		}

		updateBlock(selectedBlockID, {
			id: selectedBlockID,
			children: children ?? [],
			style: newStyle,
		})
	}

	const { style, children } = useMemo(() => {
		const block: BlockShape = getBlock(selectedBlockID) ?? {
			id: selectedBlockID,
			style: defaultBlockStyle,
			children: [],
		}
		return block
	}, [selectedBlockID, getBlock])

	const properties = useMemo(() => {
		let properties: Record<string, any> = StyleInputs
		if (style?.display === 'flex') {
			properties = { ...properties, ...FlexContainerInputs }
		}
		return properties
	}, [style])

	if (!selectedBlockID)
		return (
			<div className='h-fill w-[300px] bg-neutral-900 flex-shrink-0 text-neutral-300 p-3'>
				<p>No Block Selected</p>
			</div>
		)

	return (
		<div className='h-fill w-[300px] bg-neutral-900 flex-shrink-0 text-neutral-300 p-3 overflow-auto custom-scrollbar'>
			<button
				onClick={addChildBlock}
				className='bg-neutral-700 cursor-pointer px-3 py-1 rounded-full text-center text-xs font-semibold'
			>
				+ block
			</button>
			{Object.entries(properties).map(([key, valueOptions]) => {
				return (
					<Input
						key={key + selectedBlockID}
						property={key}
						value={
							style?.[key as keyof Style] ??
							defaultBlockStyle[key as keyof Style]
						}
						updateStyle={updateStyle}
						valueOptions={valueOptions}
					/>
				)
			})}
		</div>
	)
}

const Input: React.FC<{
	property: string
	value: Style[keyof Style]
	updateStyle: (property: string, value: string | number) => void
	valueOptions: string | string[]
}> = ({ property, value, updateStyle, valueOptions }) => {
	const label = useMemo(() => {
		return property
			.split(/(?=[A-Z])/)
			.join(' ')
			.toLowerCase()
	}, [property])

	const handleUpdate = (newValue: string | number) =>
		updateStyle(property, newValue)

	return (
		<div className='flex flex-col my-2'>
			<label
				htmlFor={property}
				className='text-xs font-semibold px-1 pt-1 pb-0.5'
			>
				{label}
			</label>
			{valueOptions === 'string' && (
				<StringInput
					property={property}
					value={String(value)}
					onChange={handleUpdate}
				/>
			)}
			{valueOptions === 'number' && (
				<NumberInput
					property={property}
					value={Number(value)}
					onChange={handleUpdate}
				/>
			)}
			{Array.isArray(valueOptions) && (
				<SelectInput
					property={property}
					value={String(value)}
					onChange={handleUpdate}
					valueOptions={valueOptions}
				/>
			)}
		</div>
	)
}

const StringInput: React.FC<{
	property: string
	value: string
	onChange: (newValue: string) => void
}> = ({ property, value, onChange }) => {
	return (
		<input
			id={property}
			className='py-1 px-2 rounded text-neutral-100 bg-neutral-700 text-xs'
			type='text'
			value={value}
			onChange={(e) => onChange(e.target.value)}
		/>
	)
}

const NumberInput: React.FC<{
	property: string
	value: number
	onChange: (newValue: number) => void
}> = ({ property, value, onChange }) => {
	return (
		<input
			id={property}
			className='py-1 px-2 rounded text-neutral-100 bg-neutral-700 text-xs'
			type='number'
			value={value}
			onChange={(e) => onChange(Number(e.target.value))}
		/>
	)
}

const SelectInput: React.FC<{
	property: string
	value: string
	onChange: (newValue: string) => void
	valueOptions: string[]
}> = ({ property, value, onChange, valueOptions }) => {
	return (
		<select
			className='p-1 rounded text-neutral-100 bg-neutral-700 text-xs'
			onChange={(e) => onChange(e.target.value)}
			value={value}
			id={property}
		>
			<option value=''>-</option>
			{valueOptions.map((option) => {
				return (
					<option key={option} value={option}>
						{option}
					</option>
				)
			})}
		</select>
	)
}

export default Properties
