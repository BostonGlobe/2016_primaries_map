import pymIframe from 'pym-iframe-resizer'
pymIframe.resizer()

import periodicJS from 'periodic.js'
import getJSON from 'get-json-lite'
import choropleth from './choropleth'

import drawPartyMap from './drawPartyMap.js'

import geodata from './ma.json'

const url = 'http://localhost:3002/results.json'

// convenience functions
const $ = (s) => document.querySelector(s)

// get map features name
const geokey = 'subunits'

function drawParty({ party }) {

	// get map container
	const container = $(`.${party} .map-container`)

	// CHOROPLETH CALL
	// setup choropleth - this returns various objects
	const { svg, path, outlineFeature, features } =
		choropleth.setup({ container, geodata, geokey })

	// CHOROPLETH CALL
	// first order of business: draw the outline
	choropleth.draw({ svg, path, outlineFeature })

	return { path, features }

}

const { path, features } = drawParty({ party: 'dem' })
drawParty({ party: 'gop' })

function fetchData(resume) {

	getJSON(url, (data) => {

		data.races.forEach(race => drawPartyMap({ race, features, path }))

// 		const { precinctsReportingPct } = stateUnit

// 		// if we have less than 100% precincts reporting, continue
// 		if (+precinctsReportingPct < 100) {

// 			// continue clock
// 			resume()

// 		}

	}, () => {

		resume()

	})

}

periodicJS({
	duration: 100 * 1000,
	displaySelector: '.updater span',
	callback: fetchData,
	runImmediately: true
})
