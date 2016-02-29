import pymIframe from 'pym-iframe-resizer'
pymIframe.resizer()

import periodicJS from 'periodic.js'
import getJSON from 'get-json-lite'
import choropleth from './choropleth'
import stateResults from './table/stateResults.js'

import drawPartyMap from './drawPartyMap.js'

import geodata from './ma.json'

// TODO: point to real url
const url = 'http://localhost:3010'

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

const displaySelector = '.updater span'

let index = 0

function fetchData(resume) {

	// tell user we are fetching data
	const element = $(displaySelector)
	element.innerHTML = 'updating'

	getJSON(url, (data) => {

		// draw party map
		data.races.forEach(race => drawPartyMap({ race, features, path }))

		// draw state results table
		data.races.forEach(race =>
			$(`.${race.party.toLowerCase()} .state-results`).innerHTML =
				stateResults({ results: race }))

		// do we have an incomplete race?
		// get state-level reporting units
		const anyIncompleteRace = data.races.find(race =>
			+race.reportingUnits
			.find(unit => unit.level ==='state')
			.precinctsReportingPct < 100
		)

		if (anyIncompleteRace) {

			// continue clock
			resume()

		} else {

			// clear the updater and don't call periodicjs again
			element.innerHTML = ''

		}

	}, () => {

		// on error, call updater again
		resume()

	})

}

// TODO: make this pull every 15 sec
periodicJS({
	duration: 100 * 1000,
	displaySelector,
	callback: fetchData,
	runImmediately: true
})
