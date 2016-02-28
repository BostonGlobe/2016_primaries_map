import drawOutline from './drawOutline.js'
import drawFeatures from './drawFeatures.js'

function drawMap({ svg, outlineFeature, features, path, featureClass }) {

	if (features) {

		drawFeatures({ svg, features, path, featureClass })

	}

	if (outlineFeature) {

		outlineFeature && drawOutline({ svg, features: [outlineFeature], path })

	}

}

export default drawMap
