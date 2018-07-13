### Teachers Little Helper

Randomly select a Slack user from a Slack workspace.

This application is a random student picker (and maybe some other things at some point). Basically it was an excuse for me to play around with React and the Slack API but it does help take the anxiety out of choosing a random student for the teacher. The use case came about during my time helping out with the [KU Coding Bootcamp](https://bootcamp.ku.edu/coding/landing).

You will need a Slack API Token with read access to user information. For local development add your token to the development.env file, in production I would suggest you add it directly to the node process, but the production.env file is there if you would like to go that route.

`SLACK_API_TOKEN` is the key that needs to be set, either in the .env file or on the node process itself.
