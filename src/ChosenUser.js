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
        let userImage;
        if (this.props.user && this.props.user.profile) {
            if (this.props.user.profile.image_original) {
                userImage = this.props.user.profile.image_original;
            } else if (this.props.user.profile.image_1024) {
                userImage = this.props.user.profile.image_1024;
            } else if (this.props.user.profile.image_512) {
                userImage = this.props.user.profile.image_512;
            } else if (this.props.user.profile.image_192) {
                userImage = this.props.user.profile.image_192;
            } else if (this.props.user.profile.image_72) {
                userImage = this.props.user.profile.image_72;
            } else if (this.props.user.profile.image_48) {
                userImage = this.props.user.profile.image_48;
            } else if (this.props.user.profile.image_32) {
                userImage = this.props.user.profile.image_32;
            } else if (this.props.user.profile.image_24) {
                userImage = this.props.user.profile.image_24;
            } else {
                userImage = 'http://via.placeholder.com/192x192';
            }
        }

        return userImage;
    }

    render(props) {
        if (this.props.user) {
            return(
                <Card centered
                    header={this.getUserName()}
                    image={this.getUserImage()}
                    color='blue'
                    className='chosen-user-card'>
                </Card>
            );
        }
    }
}

export default ChosenUser;