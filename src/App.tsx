import useLayout from './hooks/useLayout'
import Block from './components/Block'
import Properties from './components/Properties'
import Structure from './components/Structure'

function App() {
	const {
		addChildBlock,
		getBlock,
		updateBlock,
		selectedBlockID,
		setSelectedBlockID,
		deepDeleteBlock,
		deepDuplicateBlock,
	} = useLayout()

	return (
		<div className='flex flex-nowrap h-screen'>
			<Structure
				{...{
					selectedBlockID,
					setSelectedBlockID,
					getBlock,
					addChildBlock,
					deepDeleteBlock,
					deepDuplicateBlock,
				}}
			/>
			<Preview>
				<Canvas>
					<Block
						id={'root'}
						{...{ getBlock, setSelectedBlockID, selectedBlockID }}
					/>
				</Canvas>
			</Preview>
			<Properties
				{...{ selectedBlockID, getBlock, updateBlock, addChildBlock }}
			/>
		</div>
	)
}

const Canvas: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<div className='bg-white resize overflow-auto rounded-md h-[500px] w-[500px] min-h-[500px] min-w-[320px] max-h-[90%] max-w-[90%]'>
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
