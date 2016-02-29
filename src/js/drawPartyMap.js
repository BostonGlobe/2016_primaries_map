import chooseFeatureClass from './chooseFeatureClass.js'
import choropleth from './choropleth'
import compareStringsIgnoreCase from './compareStringsIgnoreCase.js'
import {
	Candidates,
	standardize,
	primaries2016Candidates
} from 'election-utils'

// convenience functions
const $ = (s) => document.querySelector(s)

export default function drawPartyMap({ race, features, path }) {

	// bind data to features
	const { reportingUnits } = race
	const partyAbbr = race.party

	// get the party's full name
	const party = standardize.expandParty(partyAbbr)

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

	const svg = $(`.${partyAbbr.toLowerCase()} .map-container svg`)

	// CHOROPLETH CALL
	// draw features
	choropleth.draw({
		svg,
		path,
		features: boundFeatures,
		chooseFeatureClass: (d) => chooseFeatureClass({ d, colorClassMapping })
	})

}
