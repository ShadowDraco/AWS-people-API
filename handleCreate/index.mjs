import dynamoose from 'dynamoose'

// Create a dynamoose Schema
const schema = new dynamoose.Schema({
	id: String,
	age: Number,
})

// Create a model

const people = dynamoose.model('people', schema)

export const handler = async event => {
	// create a response object
	const response = {
		statusCode: null,
		body: null,
	}

	try {
		// parse the event body so it can be used for creating
		let parsedEventBody = JSON.parse(event.body)

		let results = await people.create(parsedEventBody)
		console.log('\n\n RESULTS FROM CREATE', results)

		// set response with results STRINGIFIED
		response.body = JSON.stringify(results)
		response.statusCode = 200
	} catch (err) {
		response.body = JSON.stringify('ERROR AT CREATE:', err.message)
		response.statusCode = 500
	}

	return response
}
