import { useCallback, useEffect, useState } from 'react'
import useWindowResizeListener from '../hooks/useWindowResizeListener'
import Canvas from './Canvas'

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
		<div
			className='flex-grow h-fill flex justify-center items-center'
			ref={setWrapper}
		>
			<Canvas maxWidth={maxWidth} />
		</div>
	)
}

export default Preview
