### Teachers Little Helper

Select a random user from a Slack workspace, or specify a channel to pull users from. You can now build groups of two-four randomly selected users.

This application is a random student picker and group builder (and maybe some other things at some point). Basically it was an excuse to play around with React and the Slack API but it does help take the anxiety out of choosing a random student for the teacher. The random groups help facilitate learning by putting students in a situation where they must learn to communicate effectively with new teammates. The use case came about during our time helping out with the [KU Coding Bootcamp](https://bootcamp.ku.edu/coding/landing).

You will need a [Slack API Token](https://api.slack.com/custom-integrations/legacy-tokens) with read access to user information. For local development add your token to the development.env file, in production I would suggest you add it directly to the node process, but the production.env file is there if you would like to go that route.

`SLACK_API_TOKEN` is the key that needs to be set, either in the `.env` file or on the node process itself.

#### How to use
1. Set your `SLACK_API_TOKEN`
2. `yarn start`
3. Select a channel to pull from. 
    * Optional: Set options for group size and toggle the feature
5. Click "Pick A Random Student!"
6. Enjoy!

#### Here is a nice gif for your viewing pleasure

![app demo gif](/additional_assets/Helper.gif)  

##### Future Features
- [x] Narrow user base by slack channel
- [x] Group building
- [ ] Ability to drag and drop users between groups
- [ ] Match students based on skill set

I forked this from [Cameron Chapman](https://github.com/Cameron-C-Chapman/teachers-little-helper), a true legend!