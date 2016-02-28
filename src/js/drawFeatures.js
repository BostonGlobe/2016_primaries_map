import d3 from 'd3'

function drawFeatures({ svg, outlineFeature, path }) {

	// outlineFeature
	// DATA JOIN
	let outlinePaths = svg.select('g.outline').selectAll('path')
		.data([outlineFeature]);

	// UPDATE

	// ENTER
	outlinePaths.enter().append('path')
		.attr('d', path);

}

export default drawFeatures
