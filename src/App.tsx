import Properties from './components/Properties'
import Hierarchy from './components/Hierarchy'
import Canvas from './components/Canvas'

function App() {
	return (
		<div className='flex flex-nowrap h-screen bg-neutral-800'>
			<Hierarchy />
			<Canvas />
			<Properties />
		</div>
	)
}

export default App
