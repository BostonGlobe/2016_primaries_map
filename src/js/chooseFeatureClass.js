import { Candidates } from 'election-utils'

// choose how to style a feature
const chooseFeatureClass = ({ d, colorClassMapping }) => {

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

	}

	// if no data, return blank
	return BLANK

}

export default chooseFeatureClass
