import Slack from 'slack';

class SlackInstance {

    constructor(config) {
        this.instance = new Slack({token: process.env.REACT_APP_SLACK_API_TOKEN});
    }

    getUsers() {
        return this.instance.users.list();
    }

}

export default SlackInstance;