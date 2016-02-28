import d3 from 'd3'

export default function drawOutline({ svg, outlineFeature, path }) {

	// outlineFeature
	// DATA JOIN
	let outlinePaths = svg.select('g.outline').selectAll('path')
		.data([outlineFeature]);

	// UPDATE

	// ENTER
	outlinePaths.enter().append('path')
		.attr('d', path);

}
