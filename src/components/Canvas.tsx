import Block from './Block'

const Canvas: React.FC<{ maxWidth: string }> = ({ maxWidth }) => {
	return (
		<div
			className='bg-white resize overflow-auto rounded-md h-[500px] w-[500px] min-h-[500px] min-w-[320px] max-h-[90%]'
			style={{ maxWidth }}
		>
			<Block id={'root'} />
		</div>
	)
}

export default Canvas
