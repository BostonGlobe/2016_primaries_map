import { primaries2016Dates, standardize } from 'election-utils'

export default function urlManager({ stateAbbr, partyAbbr, level }) {

	// get race for this state-party combination
	const { date } = primaries2016Dates.find(el =>
		el.stateAbbr.toLowerCase() === stateAbbr.toLowerCase() &&
		el.party === standardize.expandParty(partyAbbr))

	// construct the api url
	const baseUrl = process.env.TEST ?
		'//dev.apps.bostonglobe.com/electionapi/elections/' :
		'//www.bostonglobe.com/electionapi/elections/'

	const url = `${baseUrl}${date}?statePostal=${stateAbbr}&party=${partyAbbr}&level=${level}`

	return url

}
