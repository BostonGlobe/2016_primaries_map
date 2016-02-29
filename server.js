import fs from 'fs'
import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())

// read all filenames in 'testdata'
const filenames = fs.readdirSync('./testdata').slice(0, 92)

let index = 0

app.get('/', (req, res) => {

	// read file and send it
	const file = fs.readFileSync('./testdata/' + filenames[index], 'utf8')
	console.log('serving file ' + index)
	res.json(JSON.parse(file))
	index = index < filenames.length - 1 ? index + 1 : 0

})

app.listen(3010, () => console.log('listening'))
