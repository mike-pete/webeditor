import { useMemo } from 'react'
import {
	StyleInputTypes,
	defaultBlock,
	defaultBlockStyle,
} from '../constants/const'
import { BlockShape, Style } from '../types/global'

const Properties: React.FC<{
	selectedBlockID: string
	getBlock: (key: string) => BlockShape | undefined
	updateBlock: (key: string, block: Partial<BlockShape>) => void
	addChildBlock: (parentBlockID?: string) => void
}> = ({ selectedBlockID, addChildBlock, getBlock, updateBlock }) => {
	const updateStyle = (property: string, value: string) => {
		const newStyle: Style = {
			...defaultBlockStyle,
			...style,
			[property]: value,
		}

		updateBlock(selectedBlockID, {
			style: newStyle,
		})
	}

	const { style } = useMemo(() => {
		return { ...defaultBlock, ...getBlock(selectedBlockID) }
	}, [selectedBlockID, getBlock])

	if (!selectedBlockID)
		return (
			<div className='h-fill w-[300px] bg-neutral-900 flex-shrink-0 text-neutral-300 p-3'>
				<p>No Block Selected</p>
			</div>
		)

	return (
		<div className='h-fill w-[300px] bg-neutral-900 flex-shrink-0 text-neutral-300 p-3 overflow-auto custom-scrollbar'>
			<button
				onClick={() => addChildBlock()}
				className='bg-neutral-700 cursor-pointer px-3 py-1 rounded-full text-center text-xs font-semibold'
			>
				+ block
			</button>
			{Object.entries(StyleInputTypes).map(([key, valueOptions]) => {
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
	updateStyle: (property: string, value: string) => void
	valueOptions: string | string[]
}> = ({ property, value, updateStyle, valueOptions }) => {
	const label = useMemo(() => {
		return property
			.split(/(?=[A-Z])/)
			.join('-')
			.toLowerCase()
	}, [property])

	const handleUpdate = (newValue: string) => updateStyle(property, newValue)

	return (
		<div className='grid grid-cols-2 my-2'>
			<label
				htmlFor={property}
				className='text-xs font-semibold px-1 pt-1 pb-0.5'
			>
				{label}
			</label>
			{valueOptions === 'string' && (
				<StringInput
					property={property}
					value={String(value ?? '')}
					onChange={handleUpdate}
				/>
			)}
			{valueOptions === 'number' && (
				<StringInput
					property={property}
					value={String(Number(value))}
					onChange={handleUpdate}
				/>
			)}
			{Array.isArray(valueOptions) && (
				<SelectInput
					property={property}
					value={String(value ?? '')}
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
