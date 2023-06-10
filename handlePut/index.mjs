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
		//console.log("\n\nEVENT: ", event)

		// parse the event body so it can be used for updating
		let parsedEventBody = JSON.parse(event.body)
		let id
		console.log('\n\nPARSED BODY:', parsedEventBody)
		console.log('\n\nEVENT PATH:', event.pathParameters.id)

		// if no id return
		if (!event.pathParameters.id) {
			return 'error: no id specified'
		} else {
			id = event.pathParameters.id
		}

		// pass in the body IN JSON FORMAT to update
		let results = await people.update({ id: id }, parsedEventBody)
		console.log('\n\n RESULTS FROM UPDATE', results)

		// set response with results STRINGIFIED
		response.body = JSON.stringify(results)
		response.statusCode = 200
	} catch (err) {
		console.error(err)
		response.body = JSON.stringify('ERROR AT UPDATE:', err.message)
		response.statusCode = 500
	}

	return response
}
