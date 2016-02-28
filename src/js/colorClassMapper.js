import orderBy from 'lodash.orderby'
import { primaries2016Candidates } from 'election-utils'

function colorClassMapper({ candidates, party }) {

	// this will take a list of state-level candidates.
	// we then sort the list by main status, vote count and ballot order.
	// we then assign color classes based on this.
	// finally we return a hash, { candidateID: 123, colorClass: 'red' }

	// get lowercase party - we'll use it quite a bit
	const partyL = party.toLowerCase()

	// get a list of this party's candidate last names
	const partyCandidatesNames = primaries2016Candidates
		.filter(x => x.party === partyL)
		.map(x => x.last)

	// add 'mainCandidate' boolean flag
	const enhancedCandidates = candidates.map(c => ({
		...c,
		mainCandidate: partyCandidatesNames.indexOf(c.last.toLowerCase()) > -1
	}))

	// sort by main, votecount, ballotorder (in that order
	const mapping = orderBy(enhancedCandidates,
		['mainCandidate', 'voteCount', 'ballotOrder'],
		['desc', 'desc', 'asc'])
		// and return a candidate/color class hash
		.map((c, i) => ({

			colorClass: c.mainCandidate ? `${partyL}-${i}` : `${partyL}-other`,
			candidateID: c.candidateID

		}))

	return mapping

}

export default colorClassMapper

