// Test away!
import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';

import Controls from './Controls';

afterEach(cleanup);

test('it renders without crashing', () => {
    render(<Controls />);
});

test('When open and unlocked, close button is clickable and lock is not', () => {
    const closedMock = jest.fn();
    const lockedMock = jest.fn();

    const { getByText } = render(<Controls closed={false} locked={false} toggleClosed={closedMock} toggleLocked={lockedMock} />);

    const closeButton = getByText(/close gate/i);
    const lockButton = getByText(/lock gate/i);

    expect(closeButton.disabled).toBeFalsy();
    expect(lockButton.disabled).toBeTruthy();

    fireEvent.click(closeButton);
    expect(closedMock).toBeCalled();

    fireEvent.click(lockButton);
    expect(lockedMock).not.toBeCalled();
});

test('When closed and unlocked, both of the buttons are enabled', () => {
    const closedMock = jest.fn();
    const lockedMock = jest.fn();

    const { getByText } = render(<Controls closed={true} locked={false} toggledClosed={closedMock} toggleLocked={lockedMock}/>);

    const closeButton = getByText(/open gate/i);
    const lockButton = getByText(/lock gate/i);

    expect(closeButton.disabled).toBeFalsy();
    expect(lockButton.disabled).toBeFalsy();

    fireEvent.click(closeButton);
    expect(closedMock).not.toBeCalled();

    fireEvent.click(lockButton);
    expect(lockedMock).toBeCalled();

});

test('when closed and locked, open is disabled and unlock is enabled', () => {
    const closedMock = jest.fn();
    const lockedMock = jest.fn();

    const { getByText } = render(<Controls closed={true} locked={true} toggledClosed={closedMock} toggledLocked={lockedMock} />);

    const openButton = getByText(/open gate/i);
    const unlockButton = getByText(/unlock gate/i);

    expect(openButton.disabled).toBeTruthy();
    expect(unlockButton.disabled).toBeFalsy();
});