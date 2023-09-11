import { useCallback, useEffect, useState } from 'react'
import Block from './Block'
import useWindowResizeListener from '../hooks/useWindowResizeListener'

const Canvas: React.FC = () => {
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
		<div className='flex-grow h-fill flex justify-center items-center'>
			<div
				className='bg-white resize overflow-auto rounded-md h-[500px] w-[500px] min-h-[500px] min-w-[320px] max-h-[90%]'
				style={{ maxWidth }}
				ref={setElement}
			>
				<Block id={'root'} />
			</div>
		</div>
	)
}

export default Canvas
