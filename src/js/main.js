import globeIframe from 'globe-iframe-resizer'
globeIframe()

import compareStringsIgnoreCase from './compareStringsIgnoreCase.js'
import { Candidates, standardize } from 'election-utils'
import choropleth from './choropleth.js'
import geodata from './ma.json'
import data from './testresults.json'
import colorClassMapper from './colorClassMapper.js'

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
// first order of business: draw the choropleth.
choropleth.draw({ svg, outlineFeature, path })

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
const colorClassMapping = colorClassMapper({ candidates, party })

// choose how to style a feature
const featureClass = (d) => {

	const BLANK = 'blank'

	// do we have a matching subunit?
	const { subunit } = d
	if (subunit) {

		// find this subunit's leading candidate id
		const candidate = Candidates.sort(subunit.candidates)[0]
		const { candidateID } = candidate

		// get this candidate's color class
		const { colorClass } = colorClassMapping.find(x =>
			x.candidateID === candidateID)

		// only return color class if candidate has votes
		return +candidate.voteCount > 0 ? `fill--${colorClass}` : BLANK

	} else {

		// if no data, return blank
		return BLANK

	}

}

// CHOROPLETH CALL
// draw features
choropleth.draw({ svg, features: boundFeatures, path, featureClass })
