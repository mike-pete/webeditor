import { useState } from 'react'
import useLayout from './hooks/useLayout'
import type { Block } from './types/Block'
import { defaultBlockStyle } from './constants/const'

function App() {
	const { addBlock, getBlock, updateBlock } = useLayout()
	const [selectedBlockID, setSelectedBlockID] = useState<string>('root')

	return (
		<div className='flex flex-nowrap h-screen'>
			<Preview>
				<Canvas>
					<Block
						id={'root'}
						getBlock={getBlock}
						select={setSelectedBlockID}
						selectedID={selectedBlockID}
					/>
				</Canvas>
			</Preview>
			<SideBar {...{ selectedBlockID, addBlock, getBlock, updateBlock }} />
		</div>
	)
}

const SideBar: React.FC<{
	selectedBlockID: string
	addBlock: (block?: Block) => Promise<string>
	getBlock: (key: string) => Block | undefined
	updateBlock: (key: string, block: Block) => void
}> = ({ selectedBlockID, addBlock, getBlock, updateBlock }) => {
	const addChildBlock = async () => {
		const newBlockKey = await addBlock()
		const newBlock = getBlock(newBlockKey)

		if (newBlock) {
			const selectedBlock = getBlock(selectedBlockID)
			if (!selectedBlock) {
				console.error(`block [${selectedBlockID}] not found`)
				return
			}
			updateBlock(selectedBlockID, {
				...selectedBlock,
				id: selectedBlockID,
				children: [...(selectedBlock?.children ?? []), newBlock],
			})
		}
	}

	if (!selectedBlockID)
		return (
			<div className='h-fill w-[300px] bg-neutral-900 flex-shrink-0 text-neutral-300 p-3'>
				<p>No Block Selected</p>
			</div>
		)

	return (
		<div className='h-fill w-[300px] bg-neutral-900 flex-shrink-0 text-neutral-300 p-3'>
			<p>Settings</p>
			<button onClick={addChildBlock}>+ Child Block</button>
		</div>
	)
}

const Block: React.FC<{
	id: string
	getBlock: (id: string) => Block | undefined
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
				'rounded-md hide-scrollbar cursor-pointer' +
				` ${
					id === selectedID &&
					'outline outline-4 outline-offset-[-4px] outline-sky-500'
				}`
			}
			style={{ ...defaultBlockStyle, ...style }}
			onClick={handleClick}
		>
			{children?.map(({ id }) => (
				<Block {...{ id, getBlock, select, selectedID }} key={Math.random()} />
			))}
		</div>
	)
}
const Canvas: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<div className='bg-white resize overflow-auto rounded-md h-[500px] w-[500px] min-h-[100px] min-w-[100px] max-h-[90%] max-w-[90%] custom-scrollbar'>
			{children}
		</div>
	)
}

const Preview: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<div className='flex-grow h-fill bg-neutral-800 flex justify-center items-center'>
			{children}
		</div>
	)
}

export default App
