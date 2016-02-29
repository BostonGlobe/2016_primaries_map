import d3 from 'd3'

function drawFeatures({ svg, features, path, chooseFeatureClass }) {

	// DATA JOIN
	const paths = d3.select(svg).select('g.features').selectAll('path')
		.data(features, d => d.id)

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
