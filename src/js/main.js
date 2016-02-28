import globeIframe from 'globe-iframe-resizer'
globeIframe()

import choropleth from './choropleth.js'
import geodata from './ma.json'

// convenience function
const $ = (s) => document.querySelector(s)

// get map container
const container = $('.map-container')

// get map features name
const geokey = 'subunits'

// setup choropleth - this returns various objects
const { svg, path, projection, outlineFeature, features } =
	choropleth.setup({ container, geodata, geokey })

// First order of business: draw the choropleth.
choropleth.draw({ svg, outlineFeature, path })
