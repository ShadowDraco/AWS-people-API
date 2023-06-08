# AWS People API

## [Try Me](https://xwsxni06n1.execute-api.us-west-1.amazonaws.com/V1/people)

### Routes and Uses

#### People have an _id_ (string) and an _age_ (number)

- GET /V1/people - returns array of people
- GET /V1/people/{id} - returns json object
- POST /V1/people - include a body with the updated "age" - returns json object
- PUT /V1/people/{id} - include the age to update to - returns json object
- DELETE /V1/people{id} - returns string

- any extra values in posts and puts will be left off.

##### [Root URL](https://xwsxni06n1.execute-api.us-west-1.amazonaws.com/)
