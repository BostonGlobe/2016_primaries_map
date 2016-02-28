import globeIframe from 'globe-iframe-resizer'
globeIframe()

import setupMap from './setupMap.js'
import drawFeatures from './drawFeatures.js'
import geodata from './ma.json'

// convenience function
const $ = (s) => document.querySelector(s)

// get map container
const container = $('.map-container')

// get map features name
const geokey = 'subunits'

// setup map - this returns various objects
const { svg, path, projection, outlineFeature, features } =
	setupMap({ container, geodata, geokey })

// First order of business: draw the map.
drawFeatures({ svg, outlineFeature, path })
