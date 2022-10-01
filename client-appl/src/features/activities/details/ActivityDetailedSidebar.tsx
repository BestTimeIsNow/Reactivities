import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Image, Item, Label, List, Segment } from 'semantic-ui-react';

function ActivityDetailedSidebar() {
    return (
        <>
            <Segment attached inverted textAlign='center' color='teal' style={{ border: 'none', position: 'relative' }} secondary>
                3 people are going
            </Segment>
            <Segment attached>
                <List divided>
                    <Item style={{position:'relative'}}>
                        <Label
                            style={{ position: 'absolute' }}
                            ribbon='right'
                            color='orange'
                            size='medium'
                            content='Host'
                            />
                        <Image size='tiny' src={`/assets/user.png`} />
                        <Item.Content>
                            <Item.Header as='h2'>
                                <Link to='#'>Bob</Link>
                            </Item.Header>
                            <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
                        </Item.Content>
                    </Item>
                    <Item>
                        <Image size='tiny' src={`/assets/user.png`} />
                        <Item.Content>
                            <Item.Header as='h2'>
                                <Link to='#'>Tom</Link>
                            </Item.Header>
                            <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
                        </Item.Content>
                    </Item>
                    <Item>
                        <Image size='tiny' src={`/assets/user.png`} />
                        <Item.Content>
                            <Item.Header as='h2'>
                                <Link to='#'>Sally</Link>
                            </Item.Header>
                        </Item.Content>
                    </Item>
                </List>
            </Segment>
        </>
    );
}

export default observer(ActivityDetailedSidebar);