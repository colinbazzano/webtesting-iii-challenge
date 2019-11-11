// Test away
import React from 'react';
import { render, cleanup } from '@testing-library/react';

import Dashboard from './Dashboard';

afterEach(cleanup);

test('Dashboard renders correctly', () => {
    render(<Dashboard />);
});

test('default state is open and unlocked', () => {
    const { queryByText } = render(<Dashboard />);

    expect(queryByText(/open/i)).toBeTruthy();
    expect(queryByText(/unlocked/i)).toBeTruthy();
});