// Test away!
import React from 'react';
import { render, cleanup } from '@testing-library/react';

import Display from './Display';

afterEach(cleanup);

test('renders without crashing', () => {
    render(<Display />);
});

test('the text will say open and unlocked when closed and locked are false', () => {
    const { queryByText } = render(<Display closed={false} locked={false} />);

    expect(queryByText(/unlocked/i)).toBeTruthy();
    expect(queryByText(/open/i)).toBeTruthy();
});

test('the text will say closed and locked when both are true', () => {
    const { queryByText } = render(<Display closed={true} locked={true} />);
    expect(queryByText(/locked/i)).toBeTruthy();
    expect(queryByText(/closed/i)).toBeTruthy();
});

test('the classname green-led appears when open', () => {
    const { getByText } = render(<Display closed={false} />);

    const open = getByText(/open/i);
    const unlocked = getByText(/unlocked/i)
    expect(open.className).toMatch(/green-led/i);
    expect(unlocked.className).toMatch(/green-led/i)
})

test('the classname red-led is present when closed and locked', () => {
    const { getByText } = render(<Display closed={true} locked={true} />);

    const closed = getByText(/closed/i);
    const locked = getByText(/locked/i);
    expect(closed.className).toMatch(/red-led/i);
    expect(locked.className).toMatch(/red-led/i);
});