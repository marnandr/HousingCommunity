# Housing Community Backend with TypeORM

Steps to run this project:

1. Run `npm install` command.
2. Setup database settings inside `ormconfig.json` file.
3. Generate migration by `npm run typeorm-migration-generate system_up` command.
3. Run the migration by `npm run typeorm-migration-run` command.
4. Run `npm start` command.

### API Guide

**Apartment controller**

GET: http://localhost:3000/apartments

Returns all apartmnets from the database. The following JSON array will be the response format.

```json
{
	"id": 5,
	"floor": 1,
	"door": 3,
	"area": 45,
	"airspace": 200
}
```

GET: http://localhost:3000/apartments/id

Returns all an apartment from the database by its given id. The following JSON will be the response format.

```json
{
	"id": 5,
	"floor": 1,
	"door": 3,
	"area": 45,
	"airspace": 200
}
```

POST: http://localhost:3000/save-apartment

Requires a POST request in JSON format. The response will be stored on the database.

```json
{
	"floor": 1,
	"door": 3,
	"area": 45,
	"airspace": 200
}
```

DELETE: http://localhost:3000/delete-apartment/id

Requires a DELETE request. The given ID in the URL will remove the entity from the database. The referenced apartments cannot be deleted until the reference will be removed.

**Resident controller**

GET: http://localhost:3000/residents

Returns all residents from the database. The following JSON array will be the response format.

```json
[
{
	"id": 1,
	"firstName": "John",
	"lastName": "Doe",
	"age": 40,
	"apartment": {
		"id": 1,
		"floor": 1,
		"door": 1,
		"area": 45,
		"airspace": 200
	}
}
]
```

GET: http://localhost:3000/residents/id

Returns a resident from the database by its given id. The following JSON will be the response format.

```json
[
{
	"id": 1,
	"firstName": "John",
	"lastName": "Doe",
	"age": 40,
	"apartment": {
		"id": 1,
		"floor": 1,
		"door": 1,
		"area": 45,
		"airspace": 200
	}
}
]
```

POST: http://localhost:3000/save-resident

Requires a POST request in JSON format. The response will be stored on the database. The apartment field will be **null**. To move a resident into an apartment you need to use the /move-resident root.

```json
{
	"firstName": "John",
	"lastName": "Doe",
	"age": 40
}
```

POST: http://localhost:3000/move-resident

Requires a POST request in JSON format. If the makebalance field will be true a balance will be created to the resident and you need to add an amount field to set the starting amount. The response body will be: ```{success: true}```.

```json
{
	"residentID": 1,
	"apartment": 12,
	"makebalance": true,
	"amount": 300
}
```

POST: http://localhost:3000/out-resident/:id

Requires a POST request. The given resident ID in the URL will be move out the resident from the apartment. The response body will be: ```{success: true} ```.

**Expense controller**

GET: http://localhost:3000/expenses

Returns all expenses from the database with the resident values. The following JSON array will be the response format.

```json
[
{
	"id":  1,
	"amount":  200,
	"announced":  "2021-04-07T00:00:00.000Z",
	"resident": {
		"id": 1,
		"firstName": "John",
		"lastName": "Doe",
		"age": 40
	}
}
]

```

GET: http://localhost:3000/expenses/id

Returns all expenses from the database linked to the resident id. The following JSON will be the response format.

```json
[
{
	"id":  1,
	"amount":  200,
	"announced":  "2021-04-07T00:00:00.000Z",
	"resident": {
		"id": 1,
		"firstName": "John",
		"lastName": "Doe",
		"age": 40
	}
}
]
```

POST: http://localhost:3000/divided-expense

Requires a POST request in JSON format. The response will be stored on the database. The expense value will be multiplied with the area value and set into every moved in resident.

```json
{
	"amount": 200,
	"announced": "2021-04-24",
	"comment": "Lamps"
}
```

POST: http://localhost:3000/unique-expense

Requires a POST request in JSON format. The response will be stored on the database. The expense value will be divided with all moved in apartments area and multiplied  back with every moved in residents area.

```json
{
	"amount": 20000,
	"announced": "2021-04-24",
	"comment": "Painting"
}
```

GET: http://localhost:3000/report-expense

Requires a GET request in JSON format. The report will be responded between the starting and end date.

Request:

```json
{
	"startDate": "2021-04-25",
	"endDate": "2021-04-30"
}
```

Respone:

```json
[
{
	"id": 1,
	"amount": 4000,
	"announced": "2021-04-26T00:00:00.000Z",
	"comment": "Expense",
	"resident": {
		"id": 1,
		"firstName": "John",
		"lastName": "Doe",
		"age": 25
	}
}
]
```

GET: http://localhost:3000/report-expense/:id

Requires a GET request in JSON format. The report will be responded between the starting and end date by the resident ID in request.

Request:

```json
{
	"startDate": "2021-04-25",
	"endDate": "2021-04-30"
}
```

Respone:

```json
[
{
	"id": 1,
	"amount": 4000,
	"announced": "2021-04-26T00:00:00.000Z",
	"comment": "Expense",
	"resident": {
		"id": 1,
		"firstName": "John",
		"lastName": "Doe",
		"age": 25
	}
}
]
```

**Income controller**

GET: http://localhost:3000/incomes

Returns all incomes from the database with the income values. The following JSON array will be the response format.

```json
[
{
	"id": 1,
	"amount": 200,
	"announced": "2021-04-07T00:00:00.000Z",
	"resident": {
		"id": 1,
		"firstName": "John",
		"lastName": "Doe",
		"age": 40
	}
}
]
```

GET: http://localhost:3000/incomes/id

Returns all incomes from the database linked to the resident id. The following JSON will be the response format.

```json
[
{
	"id": 1,
	"amount": 200,
	"announced": "2021-04-07T00:00:00.000Z",
	"resident": {
		"id": 1,
		"firstName": "John",
		"lastName": "Doe",
		"age": 40
	}
}
]
```

POST: http://localhost:3000/save-income

Requires a POST request in JSON format. The request will be stored on the database. The resident field will be the foreign key to the income and balance table.

```json
{
	"amount": "5000",
	"announced": "2021-04-07",
	"resident": "1"
}
```

GET: http://localhost:3000/incomes/id

Returns all incomes from the database linked to the resident id. The following JSON will be the response format.

```json
[
{
	"id": 1,
	"amount": 200,
	"announced": "2021-04-07T00:00:00.000Z",
	"resident": {
		"id": 1,
		"firstName": "John",
		"lastName": "Doe",
		"age": 40
	}
}
]
```

GET: http://localhost:3000/report-income

Requires a GET request in JSON format. The report will be responded between the starting and end date.

Request:

```json
{
	"startDate": "2021-04-25",
	"endDate": "2021-04-30"
}
```

Respone:

```json
[
{
	"id": 1,
	"amount": 4000,
	"announced": "2021-04-26T00:00:00.000Z",
	"resident": {
		"id": 1,
		"firstName": "John",
		"lastName": "Doe",
		"age": 25
	}
}
]
```

GET: http://localhost:3000/report-income/:id

Requires a GET request in JSON format. The report will be responded between the starting and end date by the user id in request.

Request:

```json
{
	"startDate": "2021-04-25",
	"endDate": "2021-04-30"
}
```

Respone:

```json
[
{
	"id": 1,
	"amount": 4000,
	"announced": "2021-04-26T00:00:00.000Z",
	"resident": {
		"id": 1,
		"firstName": "John",
		"lastName": "Doe",
		"age": 25
	}
}
]
```

**Balance controller**

GET: http://localhost:3000/get-balance

Returns all balances from the database. The following JSON will be the response format.

```json
[
{
	"id": 1,
	"amount": 300,
	"resident": {
		"id": 1,
		"firstName": "John",
		"lastName": "Doe",
		"age": 16
	}
}
]
```

GET: http://localhost:3000/get-balance/:id

Returns all balances from the database linked to the resident id. The following JSON will be the response format.

```json
[
{
	"id": 1,
	"amount": 300,
	"resident": {
		"id": 1,
		"firstName": "John",
		"lastName": "Doe",
		"age": 16
	}
}
]
```