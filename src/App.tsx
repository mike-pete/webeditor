import Properties from './components/Properties'
import Hierarchy from './components/Hierarchy'
import Preview from './components/Preview'

function App() {
	return (
		<div className='flex flex-nowrap h-screen bg-neutral-800'>
			<Hierarchy />
			<Preview />
			<Properties />
		</div>
	)
}

export default App
