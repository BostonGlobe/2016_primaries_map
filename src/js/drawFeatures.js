import d3 from 'd3'

function drawFeatures({ svg, features, path }) {

	// DATA JOIN
	let featurePaths = svg.select('g.features').selectAll('path')
		.data(features);

	// UPDATE

	// ENTER
	featurePaths.enter().append('path')
		.attr('d', path);

}

export default drawFeatures
