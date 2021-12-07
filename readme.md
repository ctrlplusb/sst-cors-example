# Serverless Stack CORS Example

This repository provides an example of CORS configuration in the context of a Serverless Stack application.

It presents a configuration in which the Frontend includes secure HTTP Only cookies in requests made against the Backend.

## Getting Started

Bootstrap the dependencies via `yarn`:

```bash
yarn install
```

The run the development command:

```bash
yarn dev
```

> This repo has been configured to run as a "local"-only app.

## Acceptance Criteria

```cucumber
Given I have a HttpOnly Cookie from the Backend
When I make any request to the Backend from the Frontend
Then the Cookie should be sent to the Backend
```
