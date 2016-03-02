import { Candidates } from 'election-utils'

// choose how to style a feature
const chooseFeatureClass = ({ d, colorClassMapping }) => {

	const BLANK = 'blank'
	const TIE = 'tie'
	let result = BLANK

	// do we have a matching subunit?
	const { subunit } = d
	if (subunit) {

		const candidates = Candidates.sort(subunit.candidates)

		// find this subunit's leading candidate id
		const candidate = candidates[0]
		const { candidateID } = candidate

		// get this candidate's color class
		const { colorClass } = colorClassMapping.find(x =>
			x.candidateID === candidateID)

		// do we have votes?
		if (+candidate.voteCount > 0) {

			// do we have a tie?
			if (candidate.voteCount === candidates[1].voteCount) {

				result = TIE

			} else {

				// no tie, just regular results
				result = `fill--${colorClass}`

			}

		} else {

			// no results
			result = BLANK
		}

	}

	return result

}

export default chooseFeatureClass
