import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Button, Container, Header, Image, Segment } from 'semantic-ui-react';

export default observer (function HomePage() {

    return (
        <Segment inverted textAlign='center' className='masthead'>
            <Container text>
                <Header inverted as='h1'>
                    <Image
                        src='/assets/logo.png'
                        size='massive'
                        style={{marginBottom:'20px'}}
                    />
                    Reactivities
                </Header>
                <Header inverted as='h2' content='Welcome to Reactivities'/>
                <Button
                    as={Link}
                    to='/activities'
                    size='huge'
                    content='Take me to the Activities!'
                    inverted
                />
            </Container>
        </Segment>
    )

})