import useLayout from './hooks/useLayout'
import Block from './components/Block'
import Properties from './components/Properties'
import Structure from './components/Structure'
import { useCallback, useEffect, useState } from 'react'
import useWindowResizeListener from './hooks/useWindowResizeListener'

function App() {
	const { deepDuplicateBlock } = useLayout()

	return (
		<div className='flex flex-nowrap h-screen'>
			{/* left sidebar to display component hierarchy */}
			<Structure
				{...{
					deepDuplicateBlock,
				}}
			/>
			{/* render the page preview */}
			<Preview>
				<Canvas>
					<Block id={'root'} />
				</Canvas>
			</Preview>
			{/* left sidebar to display and edit CSS properties */}
			<Properties />
		</div>
	)
}

const Canvas: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [maxWidth, setMaxWidth] = useState('0px')
	const [element, setElement] = useState<HTMLDivElement | null>(null)

	const updateMaxWidth = useCallback(() => {
		const parentWidth = element?.parentElement?.clientWidth
		if (parentWidth) {
			const newMaxWidth = `${parentWidth * 0.9}px`
			if (newMaxWidth !== maxWidth) {
				setMaxWidth(newMaxWidth)
			}
		}
	}, [element, maxWidth])

	useEffect(updateMaxWidth, [updateMaxWidth])
	useWindowResizeListener(updateMaxWidth)

	return (
		<div
			className='bg-white resize overflow-auto rounded-md h-[500px] w-[500px] min-h-[500px] min-w-[320px] max-h-[90%]'
			style={{ maxWidth }}
			ref={setElement}
		>
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
