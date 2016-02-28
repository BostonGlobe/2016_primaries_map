import pymIframe from 'pym-iframe-resizer'
pymIframe.resizer()

import { parse } from 'query-string'
import {
	Candidates,
	standardize,
	primaries2016Candidates
} from 'election-utils'
import choropleth from './choropleth'
import periodicJS from 'periodic.js'

import urlManager from './urlManager.js'
import chooseFeatureClass from './chooseFeatureClass.js'
import compareStringsIgnoreCase from './compareStringsIgnoreCase.js'
import getJSON from 'get-json-lite'

import geodata from './ma.json'

// convenience functions
const $ = (s) => document.querySelector(s)

// get map container
const container = $('.map-container')

// get map features name
const geokey = 'subunits'

// CHOROPLETH CALL
// setup choropleth - this returns various objects
const { svg, path, outlineFeature, features } =
	choropleth.setup({ container, geodata, geokey })

// CHOROPLETH CALL
// first order of business: draw the outline
choropleth.draw({ svg, path, outlineFeature, features })

// get race details, e.g. ['ma', 'dem']
const [stateAbbr, partyAbbr] = parse(location.search).race.split('-')

const url = urlManager({ stateAbbr, partyAbbr, level: 'ru' })

function fetchData(resume) {

	getJSON(url, (data) => {

		// next, bind data to features

		// get the results
		const results = data.races[0]

		// get the party's full name
		const party = standardize.expandParty(results.party)

		// get reporting units
		const { reportingUnits } = results

		// get state-level reporting units
		const stateUnit = reportingUnits.find(x => x.level === 'state')
		const { candidates } = stateUnit

		// get subunit-level reporting units
		const subunits = reportingUnits.filter(x => x.level === 'subunit')

		// bind features
		const boundFeatures = features.map(f => ({
			...f,
			subunit: subunits.find(s =>
				compareStringsIgnoreCase(s.reportingunitName, f.properties.apname))
		}))

		// get color mapping
		const colorClassMapping = Candidates.makeColorMappings({
			candidates,
			party,
			mainCandidates: primaries2016Candidates })

		// CHOROPLETH CALL
		// draw features
		choropleth.draw({
			svg,
			path,
			features: boundFeatures,
			chooseFeatureClass: (d) => chooseFeatureClass({ d, colorClassMapping })
		})

		const { precinctsReportingPct } = stateUnit

		// if we have less than 100% precincts reporting, continue
		if (+precinctsReportingPct < 100) {

			// continue clock
			resume()

		}

	}, () => {

		resume()

	})

}

periodicJS({
	duration: 3 * 1000,
	callback: fetchData,
	runImmediately: true
})
