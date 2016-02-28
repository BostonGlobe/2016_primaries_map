import drawOutline from './drawOutline.js'
import drawFeatures from './drawFeatures.js'

function drawMap({ svg, outlineFeature, features, path, chooseFeatureClass }) {

	if (features) {

		drawFeatures({ svg, features, path, chooseFeatureClass })

	}

	if (outlineFeature) {

		drawOutline({ svg, features: [outlineFeature], path })

	}

}

export default drawMap
