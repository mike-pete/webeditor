import { BlockShape } from "../types/Block"

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

export default SideBar
