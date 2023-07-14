import { BlockShape } from '../types/global'

const Structure: React.FC<{
	selectedBlockID: string
	addBlock: (block?: BlockShape) => Promise<string>
	getBlock: (key: string) => BlockShape | undefined
	updateBlock: (key: string, block: BlockShape) => void
}> = ({ getBlock }) => {
	return (
		<div className='h-fill w-[300px] bg-neutral-900 flex-shrink-0 text-neutral-300 p-1'>
			<Level id='root' getBlock={getBlock} />
		</div>
	)
}

const Level: React.FC<{
	id: string
	getBlock: (key: string) => BlockShape | undefined
	indentation?: number
}> = ({ id, getBlock, indentation = 0 }) => {
	const { children } = getBlock(id) ?? { children: [] }

	return (
		<div>
			<div className='hover:bg-neutral-800 px-2 py-0.5 cursor-pointer rounded'>
				<p>block</p>
			</div>
			<div className='' style={{ paddingLeft: `${indentation * 8}px` }}>
				{children?.map((id) => (
					<Level {...{ id, getBlock }} indentation={indentation + 1} key={id} />
				))}
			</div>
		</div>
	)
}

export default Structure
