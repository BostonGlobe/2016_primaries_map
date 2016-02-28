import globeIframe from 'globe-iframe-resizer'
globeIframe()

import {
	Candidates,
	standardize,
	primaries2016Candidates
} from 'election-utils'
import choropleth from './choropleth.js'
import chooseFeatureClass from './chooseFeatureClass.js'
import compareStringsIgnoreCase from './compareStringsIgnoreCase.js'

import geodata from './ma.json'
import data from './testresults.json'

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
