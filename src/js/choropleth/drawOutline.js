import d3 from 'd3'

export default function drawOutline({ svg, features, path }) {

	// DATA JOIN
	const paths = d3.select(svg).select('g.outline').selectAll('path')
		.data(features)

	// UPDATE
	paths
		.attr('d', path)

	// ENTER
	paths.enter().append('path')
		.attr('d', path)

}
