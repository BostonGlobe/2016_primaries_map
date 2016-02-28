function drawFeatures({ svg, features, path, featureClass }) {

	// DATA JOIN
	const paths = svg.select('g.features').selectAll('path')
		.data(features)

	// UPDATE
	paths
		.attr({
			d: path,
			class: featureClass
		})

	// ENTER
	paths.enter().append('path')
		.attr({
			d: path,
			class: featureClass
		})

}

export default drawFeatures
