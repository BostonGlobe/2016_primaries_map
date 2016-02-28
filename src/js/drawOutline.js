import d3 from 'd3'

export default function drawOutline({ svg, features, path }) {

	// DATA JOIN
	let outlinePaths = svg.select('g.outline').selectAll('path')
		.data(features);

	// UPDATE

	// ENTER
	outlinePaths.enter().append('path')
		.attr('d', path);

}
