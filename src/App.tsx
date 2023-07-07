import { useState } from 'react'
import useLayout from './hooks/useLayout'
import Block from './components/Block'
import SideBar from './components/SideBar'

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

const Canvas: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<div className='bg-white resize overflow-auto rounded-md h-[500px] w-[500px] min-h-[320px] min-w-[320px] max-h-[90%] max-w-[90%] custom-scrollbar'>
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
