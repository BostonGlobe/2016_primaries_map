function drawFeatures({ svg, features, path, featureClass }) {

	// DATA JOIN
	const featurePaths = svg.select('g.features').selectAll('path')
		.data(features)

	// UPDATE

	// ENTER
	featurePaths.enter().append('path')
		.attr({
			d: path,
			class: featureClass
		})

}

export default drawFeatures
