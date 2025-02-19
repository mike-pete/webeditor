import { SandpackLayout, SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react'
import bime from '@mike.pete/bime'
import { useCallback, useEffect, useState } from 'react'
import useGenerateHTML from '../hooks/useGenerateHTML'
import useWindowResizeListener from '../hooks/useWindowResizeListener'
import { useLayout } from '../stores/useLayout'
import Canvas from './Canvas'

function Runner({ maxWidth }: { maxWidth: string }) {
	const html = useGenerateHTML()
	const setSelectedBlockID = useLayout((state) => state.setSelectedBlockID)

	useEffect(() => {
		const selectComponent = (id: string) => setSelectedBlockID(id)

		const model = { selectComponent }
		const listener = bime.listen(model, '*')

		return listener.cleanup
	}, [setSelectedBlockID])

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
		<div className='min-h-screen h-screen'>
			${html}
		</div>
	)
}
				`,
			}}
			style={{ height: '100%' }}
		>
			<SandpackLayout style={{ border: 'none', height: '100%', backgroundColor: 'transparent' }}>
				<div className='flex flex-col gap-4 justify-center items-center w-full h-full'>
					<div className='overflow-hidden rounded resize h-[90%] w-10/12' style={{ maxWidth }}>
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
				<Runner maxWidth={maxWidth} />
			</div>
		</div>
	)
}

export default Preview
