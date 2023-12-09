/* eslint-disable testing-library/no-node-access */
import { fireEvent, screen, waitFor, within, render } from '@testing-library/react';

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

describe('Products in the products route', () => {

  it('displays the product on the page', () => {
    render(<RouterProvider router={router} />)

    const product1 = within(screen.getByTestId('section')).getByTestId('product-1').lastChild?.textContent

    expect(product1).toEqual('Fjallraven - Foldsack No. 1 Backpack, Fits 15...')
  })

  it('routes to the product page with the selected id', async () => {
    render(<RouterProvider router={router} />)

    expect(router.state.location.pathname).toEqual('/products')

    const product1 = within(screen.getByTestId('section')).getByTestId('product-1')

    fireEvent.click(product1)

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/product/1'))
  })

})

