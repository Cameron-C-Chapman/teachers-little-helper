import Slack from 'slack';

class SlackInstance {

    constructor(config) {
        const SLACK_API_TOKEN = process.env.REACT_APP_SLACK_API_TOKEN ? process.env.SLACK_API_TOKEN : 
        this.instance = new Slack({token: SLACK_API_TOKEN});
    }

    getUsers() {
        return this.instance.users.list();
    }

}

export default SlackInstance;