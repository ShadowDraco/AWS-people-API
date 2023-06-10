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
		let id
		// if no id return
		if (!event.pathParameters.id) {
			return 'error: no id specified'
		} else {
			id = event.pathParameters.id
		}
		// parse the event body so it can be used for updating

		console.log('\n\nEVENT PATH:', id)

		// pass in the body IN JSON FORMAT to update
		let results = await people.delete(id)
		console.log('\n\n RESULTS FROM DELETE', results)

		// set response with results STRINGIFIED
		response.body = 'Success!'
		response.statusCode = 200
	} catch (err) {
		console.error(err)
		response.body = JSON.stringify('ERROR AT UPDATE:', err.message)
		response.statusCode = 500
	}

	return response
}
