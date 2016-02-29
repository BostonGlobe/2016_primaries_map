import addCommas from 'add-commas'
import {
	standardize,
	Candidates,
	Candidate,
	primaries2016Candidates,
	primaries2016Dates
} from 'election-utils'
import orderBy from 'lodash.orderby'
import compareStringsIgnoreCase from './../compareStringsIgnoreCase.js'

function candidateRow({ candidate, index, totalVoteCount, party, prioritize }) {

	console.log(party)

	const first = candidate.hasOwnProperty('first') ? candidate.first : ''
	const last = candidate.hasOwnProperty('last') ? candidate.last : ''
	const voteCount = candidate.hasOwnProperty('voteCount') ? candidate.voteCount : 0
	const percent = totalVoteCount > 0 ? candidate.voteCount / totalVoteCount : 0
	const displayPct = standardize.percent(percent)

	const winnerTag = Candidate.isWinner(candidate) ? '<span class="winner">✔</span>' : ''

	const image = primaries2016Candidates.find(c => c.last === last.toLowerCase())
		? `${last.toLowerCase().replace("'", '')}.jpg`
		: 'placeholder.png'

	const fancy = `
	<div class='candidate-row fancy'>
		<div class='photo'><img alt='' src="assets/img/${image}" /></div>
		<div class='two-rows'>
			<div class='name-and-pct'>
				<div class='name'>${winnerTag}<span class='first epsilon'>${first}</span> <span class='last epsilon'>${last}</span></div>
				<div class='pct'><span class='epsilon'>${displayPct}%</span></div>
			</div>
			<div class='bar-and-votes'>
				<div class='bar'><span class='iota wrapper'><span class='fill--${party.toLowerCase()}-${index}' style='width: ${displayPct}%'>&nbsp;</span></span></div>
				<div class='votes'><span class='iota'>${addCommas(voteCount)} votes</span></div>
			</div>
		</div>
	</div>
	`

	const lite = `
	<div class='candidate-row lite'>
		<div class='name-and-votes-and-pct'>
			<span class='name first eta'>${first}</span> <span class='name last eta'>${last}</span> <span class='votes iota'>${addCommas(voteCount)} votes</span> <span class='pct theta'>${displayPct}%</span>
		</div>
	</div>
	`

	return index < prioritize ? fancy : lite

}

export default function stateResults({ race, show, prioritize }) {

	// get state-level reporting unit
	const stateUnit = race.reportingUnits.find(x => x.level === 'state')

	// augment candidate with 'isMainAndRunning' boolean flag
	const candidates = stateUnit.candidates.map(candidate => {

		// try to find this candidate in primaries2016Candidates
		const mainCandidate = primaries2016Candidates.find(c =>
			compareStringsIgnoreCase(c.last, candidate.last))

		const isMainAndRunning = !!mainCandidate && !mainCandidate.suspendedDate

		return {
			...candidate,
			isMainAndRunning
		}

	})

	// sort candidates
	const sortedCandidates = orderBy(candidates,
		['isMainAndRunning', 'voteCount', 'ballotOrder'],
		['desc', 'desc', 'asc']
	)

	// get the total vote count
	const totalVoteCount = Candidates.getVoteCount(sortedCandidates)

	const party = standardize.expandParty(race.party)

	const stateAbbr = stateUnit.statePostal
	const state = standardize.expandState(stateAbbr)

	const raceType = standardize.raceType(race.raceType)

	const raceInfo = primaries2016Dates.find(d => {

		const sameState = compareStringsIgnoreCase(d.stateAbbr, stateAbbr)
		const sameParty = compareStringsIgnoreCase(d.party, party)
		return sameState && sameParty

	})

	const note = raceInfo.resultsNote ? `<div class="results-note">Note: ${raceInfo.resultsNote}</div>` : ''

	return `

	<div class='title-and-updater ${party}'>
		<div class='title'><span class='iota'>${state} ${party} ${raceType}</span></div>
	</div>

	<div class='results ${party}'>
		${sortedCandidates.slice(0, show).map((candidate, index) => candidateRow({ candidate, index, totalVoteCount, party, prioritize })).join('')}
	</div>

	${note}

	<div class='precincts-and-more'>
		<div class='precincts'><span class='iota'>${+stateUnit.precinctsReportingPct}% <span class='extra'>precincts</span> reporting</span></div>
	</div>

	`

}

