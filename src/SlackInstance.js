import Slack from 'slack';

class SlackInstance {

    constructor(config) {
        this.instance = new Slack({token: process.env.REACT_APP_SLACK_API_TOKEN});
    }

    getUsers() {
        return this.instance.users.list();
    }

    getChannels() {
        return this.instance.channels.list();
    }

}

export default SlackInstance;