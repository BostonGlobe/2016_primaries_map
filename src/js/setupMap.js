import topojson from 'topojson'
import createSvg from './createSvg.js'

function setupMap({ container, geodata, geokey }) {

	// extract main feature from topojson
	const feature =	topojson.feature(geodata, geodata.objects[geokey])

	// extract features from main feature
	const features = feature.features

	// create outline feature
	const outlineFeature = topojson.merge(geodata, geodata.objects[geokey].geometries)

	const { svg, path, projection } = createSvg({ feature, container })

	return { svg, path, projection, outlineFeature, features }

}

export default setupMap
