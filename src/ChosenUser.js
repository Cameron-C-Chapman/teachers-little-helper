import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';

class ChosenUser extends Component {
    constructor(props) {
        super(props);
    }

    getUserName = () => {
        if (this.props.user && this.props.user.real_name) {
            return this.props.user.real_name;
        }
    }

    getUserImage = () => {
        if (this.props.user && this.props.user.profile && this.props.user.profile.image_192) {
            return this.props.user.profile.image_192;
        }
    }

    render(props) {
        if (this.props.user) {
            return(
                <Card centered
                    header={this.getUserName()}
                    image={this.getUserImage()}>
                </Card>
            );
        }
    }
}

export default ChosenUser;