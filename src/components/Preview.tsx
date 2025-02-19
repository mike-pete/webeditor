import { SandpackLayout, SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react'
import bime from '@mike.pete/bime'
import { useCallback, useEffect, useState } from 'react'
import useGenerateHTML from '../hooks/useGenerateHTML'
import useWindowResizeListener from '../hooks/useWindowResizeListener'
import { useLayout } from '../stores/useLayout'
import Canvas from './Canvas'

function Runner() {
	const html = useGenerateHTML()
	const [count, setCount] = useState(0)
	const setSelectedBlockID = useLayout((state) => state.setSelectedBlockID)

	useEffect(() => {
		const selectComponent = (id: string) => setSelectedBlockID(id)

		const model = { selectComponent }
		const listener = bime.listen(model, '*')

		return listener.cleanup
	}, [setSelectedBlockID])

	console.log('count', count)

	return (
		<SandpackProvider
			options={{
				externalResources: ['https://cdn.tailwindcss.com'],
			}}
			template={'react'}
			customSetup={{
				dependencies: {
					'@mike.pete/bime': 'latest',
					clsx: 'latest',
				},
			}}
			files={{
				'App.js': `
import bime from '@mike.pete/bime'
import clsx from 'clsx';
import { useEffect, useState } from 'react'

export default function Page() {
	const remote = bime.remote(window.parent, '*')
	const [selectedComponent, setSelectedComponent] = useState('root')

	return (
		<>
			${html}
		</>
	)
}
				`,
			}}
		>
			<SandpackLayout style={{ backgroundColor: 'transparent', border: 'none' }}>
				<div className='flex flex-col gap-4 justify-center items-center w-full h-full'>
					<div className='overflow-hidden rounded bg-red-500 p-1 resize'>
						<SandpackPreview
							style={{ height: '100%' }}
							showOpenInCodeSandbox={false}
							showRestartButton={false}
							showRefreshButton={false}
						/>
					</div>
				</div>
				{/* 
				<SandpackFileExplorer />
				<SandpackCodeEditor /> 
				*/}
			</SandpackLayout>
		</SandpackProvider>
	)
}

const Preview: React.FC = () => {
	const [maxWidth, setMaxWidth] = useState('0px')
	const [wrapper, setWrapper] = useState<HTMLDivElement | null>(null)

	const updateMaxWidth = useCallback(() => {
		const wrapperWidth = wrapper?.clientWidth
		if (wrapperWidth) {
			const newMaxWidth = `${wrapperWidth * 0.9}px`
			if (newMaxWidth !== maxWidth) {
				setMaxWidth(newMaxWidth)
			}
		}
	}, [wrapper, maxWidth])

	useEffect(updateMaxWidth, [updateMaxWidth])
	useWindowResizeListener(updateMaxWidth)

	return (
		<div className='flex-grow grid grid-columns-1 grid-rows-2' ref={setWrapper}>
			<div className='h-full w-full flex justify-center items-center'>
				<Canvas maxWidth={maxWidth} />
			</div>

			<div className='h-full w-full bg-neutral-700'>
				<Runner />
			</div>
		</div>
	)
}

export default Preview
