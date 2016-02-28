import d3 from 'd3'
import createPath from './createPath.js'

function createSvg({ feature, container }) {

	const { path, width, height } =
		createPath({ feature, container })

	// create the svg
	const svg = d3.select(container)
		.append('svg')
		.attr({
			class: 'choropleth',
			viewBox: [0, 0, width, height].join(' '),
			preserveAspectRatio: 'xMidYMid'
		})

	svg.append('g').attr('class', 'features')
	svg.append('g').attr('class', 'outline')

	return { svg, path }

}

export default createSvg
