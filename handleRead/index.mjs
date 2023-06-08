import dynamoose from 'dynamoose';

// Create a dynamoose Schema
const schema = new dynamoose.Schema({
  id: String,
  age: Number,
});

// Create a model

const friends = dynamoose.model('friends', schema);

export const handler = async event => {
  // create a response object
  const response = {
    statusCode: null,
    body: null,
  };
  // Check if searching by ID or by nothing
  console.log('EVENT PATH PARAMETERS:', event.pathParameters);
  // get the path parameters no matter the state they are in to avoid errors
  let eventPath =
    event.pathParameters && event.pathParameters.id
      ? event.pathParameters.id
      : null;
  console.log('\n\nEVENT PATH: ', eventPath);

  try {
    let results;

    // Get ALL if there is no event path
    if (!eventPath) {
      console.log('\n\nGETTING ALL:');
      // scan the database
      results = await friends.scan().exec();
      console.log('GET ALL RESULTS:', results);
    } else {
      console.log('\n\nGETTING ONE:');
      // scan the database by ID
      results = await friends.get(eventPath);
      console.log('GET ONE RESULTS:', results);
    }

    response.body = results;
    response.statusCode = 200;
  } catch (err) {
    response.body = JSON.stringify('ERROR AT GET:', err);
    response.statusCode = 500;
  }

  console.log('FINAL RESPONSE:', response);

  return response;
};


