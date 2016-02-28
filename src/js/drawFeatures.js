function drawFeatures({ svg, features, path, chooseFeatureClass }) {

	// DATA JOIN
	const paths = svg.select('g.features').selectAll('path')
		.data(features)

	// UPDATE
	paths
		.attr({
			d: path,
			class: chooseFeatureClass
		})

	// ENTER
	paths.enter().append('path')
		.attr({
			d: path,
			class: chooseFeatureClass
		})

}

export default drawFeatures
