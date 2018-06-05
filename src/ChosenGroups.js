import React, { Component } from 'react';
import { Card, Feed } from 'semantic-ui-react';

import ChosenUser from './ChosenUser'

class ChosenGroups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: this.props.groups,
            groupSize: this.props.groupSize,
            buildGroups: this.props.buildGroups
        }
    }

    buildCards = () => {
        let groups = this.props.groups
        let cards = [];
        if  (this.props.buildGroups && groups.length >=1){
            for (let i=0; i<groups.length; i++){
                let group = [];
                for(let j=0; j<groups[i].length; j++){ 
                    let groupMember = <ChosenUser key={ i+j } user={ groups[i][j] } isGrouped={ this.props.buildGroups } groupSize={ this.props.groupSize } selectedChannel={ this.props.selectedChannel }></ChosenUser>;
                    group.push(groupMember);
                }

                let groupFeed =(
                    <Card raised color='violet'>
                        <Card.Content>
                            <Feed>
                                { group }
                            </Feed>
                        </Card.Content>
                    </Card>
                )
                cards.push(groupFeed)
            }
        }
        return cards
    }

    render(props) {
        if (this.props.groups) {
            return(
                this.buildCards()
            );
        }
    }
}

export default ChosenGroups;