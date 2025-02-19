import { useCallback } from "react"
import { useLayout } from "../stores/useLayout"

const useGenerateHTML = () => {
	const layout = useLayout((state) => state.layout)
	console.log('layout', Object.keys(layout).length)
	const generateHTML = useCallback(
		(id = 'root', level = 1): string => {
			const children = layout[id].children.map((childID) => generateHTML(childID, level + 1)) ?? []
			const styles = layout[id].style

			let childString = ``

			const tab = '\t'.repeat(level)

			if (children.length > 0) {
				childString = `\n${tab}${children.join(`\n${tab}`)}\n${'\t'.repeat(level - 1)}`
			}

			// return `<div style={${JSON.stringify(styles)}}>${childString}</div>`
			return `
<span onClick={
		(event) => {
			event.stopPropagation()
			remote.selectComponent('${id}')
			setSelectedComponent('${id}')
		}
	} className={clsx('contents cursor-pointer', selectedComponent === '${id}' && '[&>*]:outline [&>*]:outline-4 [&>*]:outline-offset-[-4px] [&>*]:outline-sky-500')}>
	<div style={${JSON.stringify(styles)}}>${childString}</div>
</span>
`
		},
		[layout]
	)

	return generateHTML()
}

export default useGenerateHTML
