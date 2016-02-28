import d3 from 'd3'

function createSvg({ feature, container }) {

	// we'll center the map on the centroid
	const centroid = d3.geo.centroid(feature)

	// Create a unit projection.
	const projection = d3.geo.albers()
		.center([0, centroid[1]])
		.rotate([-centroid[0], 0])
		.scale(1)
		.translate([0, 0])

	// Create a path generator.
	const path = d3.geo.path()
		.projection(projection)
		.pointRadius(10)

	// Compute the bounds of a feature of interest.
	const b = path.bounds(feature)

	// we'll use the aspect to update container dimensions
	// we wouldn't need to do this were it not for safari
	// because chrome obeys svg viewport
	const aspect = (b[1][0]-b[0][0])/(b[1][1]-b[0][1])

	// Use normalized width and height.
	const width = container.parentNode.offsetWidth
	const height = Math.round(width/aspect)

	// Compute scale and translate.
	const s = 0.9 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height)
	const t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2]

	// Update the projection to use computed scale & translate.
	projection
		.scale(s)
		.translate(t)

	// create the svg
	const svg = d3.select(container)
		.append('svg')
		.attr({
			viewBox: [0, 0, width, height].join(' '),
			preserveAspectRatio: 'xMidYMid'
		})

	svg.append('g').attr('class', 'outline')
	svg.append('g').attr('class', 'features')

	return { svg, path, projection }

}

export default createSvg
