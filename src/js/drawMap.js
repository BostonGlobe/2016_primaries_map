import drawOutline from './drawOutline.js'
import drawFeatures from './drawFeatures.js'

function drawMap({ svg, outlineFeature, features, path }) {

	drawOutline({ svg, features: [outlineFeature], path })
	drawOutline({ svg, features, path })

}

export default drawMap
