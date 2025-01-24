import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Hero from '../components/Hero';


test('renders hero component without crash', () => {
    render(
        <MemoryRouter>
            <Hero />
        </MemoryRouter>
    );
});