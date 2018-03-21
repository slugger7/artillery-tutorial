# Artillery with sequential requests #

## What is artillery? ##

"Artillery is a modern, powerful, easy-to-use load-testing toolkit. Artillery has a strong focus on developer happiness & ease of use, and a batteries-included philosophy. Our goal is to help developers build faster, more resilient and more scalable applications." - from [NPM](https://www.npmjs.com/package/artillery)

## Why artillery? ##

A project that I was on a while back needed to have a certain amount of concurrent users that can use the application. The only problem is that you hit one endpoint on the API multiple times using data that it returns as input to the next request. This is where artillery came in to save the day as you can save sections of the response from the API in a variable to use in the subsequent request. (There will be an example API and artillery script)

## Installation ##

Look at artillery on [NPM](https://www.npmjs.com/package/artillery).

```
npm i -g artillery
```

## Usages ##

There are two main usages
- YAML
- JSON

We will be focusing on the YAML implementation of artillery here. But feel free to convert it ti JSON.

## The API ##

The API is really a simple API with one endpoint `/increment-number` that will return `{ number: 1 }` when hit with a GET request without a query. When you hit the endpoint with the query `/increment-number?number=1` it will return a JSON object `{ number: 2 }`. Before this endpoint returns anything it will sleep for 500ms to simulate how complex it is to increment a number. The api code can be found [here](./index.js)

## The sequential requests ##

Now we can finally get to the meat of things.
To run the artillery test firs make sure that you have run `npm i` in the root of this project.
Start up the API `npm start` and in a different terminal `npm test` to and let artillery bombard the API.

### The test script ###

```
01  config:
02    target: 'http://localhost:3000'
03    phases:
04      - duration: 10
05        arrivalRate: 1
06  scenarios:
07    - flow:
08        - get:
09            url: "/increment-number"
10            capture: 
11              json: "$.number"
12              as: "number"
13        - loop:
14          - get:
15              url: "/increment-number?number={{ number }}"
16              capture:
17                json: "$.number"
18                as: "number"
19          count: 100
```

- `08` is the first `GET` request that will get the default value from the API.
- `11` is the path to the variable that we wish to save to use in a subsequent request.
- `12` gives the variable a name in order for us to reference it in a subsequent request.
- `13` sets up a loop with `19` specifying how many times we wish to loop should execute the requests inside of it.
- `19` we use the `number` variable in the request for the next number using the `{{ number }}` syntax.
- `16` we reassign the `number` with the response from the API to use it in the next execution of the loop.

## Conclusion ##

Artillery makes it easy to create test scripts and commit them to source control. For more information on using artillery head over to their [NPM](https://www.npmjs.com/package/artillery) repository or their [website](https://artillery.io) to see what else this amazing load testing tool can do.
