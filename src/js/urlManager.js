import { primaries2016Dates, standardize} from 'election-utils'
import compareStringsIgnoreCase from './compareStringsIgnoreCase.js'

export default function urlManager({stateAbbr, partyAbbr, level}) {

	// get race for this state-party combination
	const { date } = primaries2016Dates.find(el =>
		compareStringsIgnoreCase(el.stateAbbr, stateAbbr) &&
		compareStringsIgnoreCase(el.party, standardize.expandParty(partyAbbr))
	)

	// construct the api url
	const baseUrl = process.env.TEST ? '//dev.apps.bostonglobe.com/electionapi/elections/' : '//www.bostonglobe.com/electionapi/elections/'

	const url = `${baseUrl}${date}?statePostal=${stateAbbr}&level=${level}`

	return url

}
