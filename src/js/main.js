import pymIframe from 'pym-iframe-resizer'
pymIframe.resizer()

import periodicJS from 'periodic.js'
import getJSON from 'get-json-lite'
import choropleth from './choropleth'
import stateResults from './table/stateResults.js'
import urlManager from './urlManager.js'

import drawPartyMap from './drawPartyMap.js'

import geodata from './ma.json'

// TODO: point to real url
const url = urlManager({ stateAbbr: 'ma', partyAbbr: 'dem', level: 'ru' })

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

const displaySelector = '.updater .text'

function updateElement({ selector, html }) {

	$(selector).innerHTML = html

}

function updateTable(race) {

	const table = $(`.${race.party.toLowerCase()} .state-results`)
	const { show } = table.dataset
	const { prioritize } = table.dataset
	const html = stateResults({ race, show, prioritize })
	table.innerHTML = html

}

function fetchData(resume) {

	// tell user we are fetching data
	const element = $(displaySelector)
	element.innerHTML = 'Updating&hellip;'

	getJSON(url, (data) => {

		// draw party map
		data.races.forEach(race => drawPartyMap({ race, features, path }))

		// draw state results table
		data.races.forEach(updateTable)

		// do we have an incomplete race?
		// get state-level reporting units
		const anyIncompleteRace = data.races.find(race =>
			+race.reportingUnits
			.find(unit => unit.level === 'state')
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
	duration: 15 * 1000,
	displaySelector,
	callback: fetchData,
	runImmediately: true
})
