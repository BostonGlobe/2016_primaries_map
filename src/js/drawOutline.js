export default function drawOutline({ svg, features, path }) {

	// DATA JOIN
	const outlinePaths = svg.select('g.outline').selectAll('path')
		.data(features)

	// UPDATE

	// ENTER
	outlinePaths.enter().append('path')
		.attr('d', path)

}
