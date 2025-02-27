import { useCallback } from 'react'
import { useLayout } from '../stores/useLayout'

const interactiveWrapper = ({
	id,
	className,
	children,
}: {
	id: string
	className: string
	children: string
}) => `
				<span onClick={
					(event) => {
			event.stopPropagation()
			remote.selectComponent('${id}')
			setSelectedComponent('${id}')
		}
	} className={clsx('contents cursor-pointer', selectedComponent === '${id}' && '[&>*]:outline [&>*]:outline-4 [&>*]:outline-offset-[-4px] [&>*]:outline-sky-500')}>
	<div className="${className}">${children}</div>
</span>
`

const useGenerateHTML = (environment: 'design' | 'preview' = 'design') => {
	const layout = useLayout((state) => state.layout)
	const generateHTML = useCallback(
		(id = 'root', level = 1): string => {
			const component = layout[id]

			if (!component) {
				return ''
			}

			const { className = '' } = layout[id].props

			const children = 'children' in layout[id].props
				? layout[id].props.children.map((childID) => generateHTML(childID, level + 1))
				: []

			let childString = ``

			const tab = '\t'.repeat(level)

			if (children.length > 0) {
				childString = `\n${tab}${children.join(`\n${tab}`)}\n${'\t'.repeat(level - 1)}`
			}

			if (environment === 'preview') {
				return `<div className="${className}">${childString}</div>`
			}

			return interactiveWrapper({ id, className, children: childString })
		},
		[environment, layout]
	)

	return generateHTML()
}

export default useGenerateHTML
