export default function drawOutline({ svg, features, path }) {

	// DATA JOIN
	const paths = svg.select('g.outline').selectAll('path')
		.data(features)

	// UPDATE
	paths
		.attr('d', path)

	// ENTER
	paths.enter().append('path')
		.attr('d', path)

}
