import { SandpackLayout, SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react'
import { useCallback, useEffect, useState } from 'react'
import useWindowResizeListener from '../hooks/useWindowResizeListener'
import Canvas from './Canvas'
import { useLayout } from '../stores/useLayout'

function Runner() {
	const layout = useLayout((state) => state.layout)
	
		console.log(layout)
	
		const x = (id: string, level = 1): string => {
			const children = layout[id].children.map((childID) => x(childID, level + 1)) ?? []
			const styles = layout[id].style
	
			let childString = ``
	
			const tab = '\t'.repeat(level)
	
			if (children.length > 0) {
				childString = `\n${tab}${children.join(`\n${tab}`)}\n${'\t'.repeat(level-1)}`
			}
			
	
			return `<div style={${JSON.stringify(styles)}}>${childString}</div>`
		}
	return (
		<SandpackProvider
			options={{
				externalResources: ['https://cdn.tailwindcss.com'],
			}}
			template={'react'}
			files={{
				'App.js': `
			import { useEffect } from 'react'
		export default function Page() {
		useEffect(() => {
		setInterval(() => {
window.parent.postMessage({
type: 'PERIODIC_MESSAGE',
timestamp: new Date().toISOString(),
data: 'Hello from interval!'
}, '*');
}, 5000);


}, [])
			return (
				<>
				${x('root')}
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
				{/* <SandpackFileExplorer />
		<SandpackCodeEditor /> */}
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

			<div className='h-full w-full bg-neutral-700'><Runner /></div>
		</div>
	)
}

export default Preview
