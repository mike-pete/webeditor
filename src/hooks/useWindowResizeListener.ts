import { useEffect } from 'react'

const useWindowResizeListener = (callback: () => void) => {
	useEffect(() => {
		window.addEventListener('resize', callback)
		return () => window.removeEventListener('resize', callback)
	}, [callback])
}

export default useWindowResizeListener
