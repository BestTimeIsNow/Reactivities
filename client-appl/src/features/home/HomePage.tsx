import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';

export default function HomePage() {
    useEffect(() => {console.log('useeffect in homepage') })

    return (
        <Container style={{marginTop:'7em'} }>
            <h1>HomePage</h1>
        </Container>
        )
}