import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Header, Image, Item, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    activity: Activity | undefined
}

function ActivityDetailedHeader({ activity }: Props) {

    const imageStyle = {
        filter: 'brightness(30%)'
    }

    const imageTextStyle = {
        position: 'absolute',
        left: '5%',
        bottom: '5%',
        color: 'white',
        width: '100%',
        height: 'auto'
    }

    return (
        <Segment.Group>
            <Segment basic>
                <Image fluid style={imageStyle} src={`/assets/categoryImages/${activity?.category}.jpg`} />
                <Segment basic style={imageTextStyle}>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    content={activity?.title}
                                    style={{ color: "white" }}
                                    size="huge"
                                />
                                <p>{activity?.date}</p>
                                <p>Hosted by <strong>Bob</strong></p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment>
                <Button content="Join Activity" color="teal" />
                <Button content="Cancel Attendance" />
                <Button content="Manage Event" color="orange" floated="right" />
            </Segment>
        </Segment.Group>
    );
}

export default observer(ActivityDetailedHeader)