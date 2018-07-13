import React, { Component } from 'react';
import { Card, Feed } from 'semantic-ui-react';
import ChosenUser from './ChosenUser';

class ChosenGroups extends Component {
    constructor(props) {
        super(props)
        this.state = {
            groups: this.props.groups,
            groupSize: this.props.groupSize,
            buildGroups: this.props.buildGroups
        }
    }

    buildCards = () => {
        let props = this.props;
        let cards = [];

        if  (props.buildGroups && props.groups.length >=1){
            for (let i=0; i < props.groups.length; i++){

                let chosenUser = props.groups[i].map((user) => 
                    <ChosenUser key={ user.real_name } user={ user } isGrouped={ props.buildGroups } ></ChosenUser>
                )

                let groupUserFeed =
                    <Card key={i.toString()} raised color="violet">
                        <Card.Content>
                            <Card.Header>Group {i}</Card.Header>
                        </Card.Content>
                        <Card.Content>
                            <Feed>
                                { chosenUser }
                            </Feed>
                        </Card.Content>
                    </Card>;
                
                cards.push(groupUserFeed);
            }
        }
        return cards;
    }

    render() {
        if (this.props.groups) {
            return(
                this.buildCards()
            );
        }
    }
}

export default ChosenGroups;