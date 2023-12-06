/* eslint-disable testing-library/no-node-access */
import { fireEvent, screen, waitFor, within } from '@testing-library/react';

import { RouterProvider } from 'react-router-dom'
import { customRender, selectedProductState, router, defaultState } from './sharedTest';

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
    customRender(<RouterProvider router={router} />, defaultState)

    const product1 = within(screen.getByTestId('section')).getByTestId('product-1').lastChild?.textContent

    expect(product1).toEqual('Fjallraven - Foldsack No. 1 Backpack, Fits 15...')
  })

  it('routes to the product page with the selected id', async () => {
    customRender(<RouterProvider router={router} />, selectedProductState)

    expect(router.state.location.pathname).toEqual('/products')

    const product1 = within(screen.getByTestId('section')).getByTestId('product-1')

    fireEvent.click(product1)

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/product/1'))
  })

})

