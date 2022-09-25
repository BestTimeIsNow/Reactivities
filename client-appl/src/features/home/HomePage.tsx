import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';

export default observer( function HomePage() {

    return (
        <Container style={{marginTop:'7em'} }>
            <h1>HomePage</h1>
            <h3>Go to <Link to='/activities'>Activities</Link></h3>
        </Container>
        )
})