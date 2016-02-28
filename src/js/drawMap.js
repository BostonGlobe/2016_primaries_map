import drawOutline from './drawOutline.js'
import drawFeatures from './drawFeatures.js'

function drawMap({ svg, outlineFeature, features, path }) {

	drawOutline({ svg, outlineFeature, path })

}

export default drawMap
