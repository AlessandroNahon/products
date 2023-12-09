/* eslint-disable testing-library/no-node-access */
import { act, render } from '@testing-library/react';

import { RouterProvider } from 'react-router-dom'
import { router } from './sharedTest';
const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}));

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(Response)
  } as unknown as Response)

  mockedNavigate.mockReset();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('App renders', () => {

  it('lands on root route and then reroutes to products page', () => {
    render(<RouterProvider router={router} />)
    act(() => {
      router.navigate('/')
    })
    expect(router.state.location.pathname).toEqual('/products')
  });
})

