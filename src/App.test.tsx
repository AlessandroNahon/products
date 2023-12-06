/* eslint-disable testing-library/no-node-access */
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { ProductContext, ProductContextType, routes } from './App';
import { products } from './testData'

import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { mockOptions } from './api';

const customRender = (ui: any, productContext: ProductContextType) => {
  return render(
    <ProductContext.Provider value={productContext}>{ui}</ProductContext.Provider>
  )
}

const router = createMemoryRouter(routes, {
  initialEntries: ["/", "/products"],
  initialIndex: 1,
});

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

const selectProduct = jest.fn()
const selectOption = jest.fn()
const selectSize = jest.fn()

const defaultState: ProductContextType = { products, selectProduct, selectedProduct: [], selectOption, selectedOption: mockOptions[0], selectSize, selectedSize: mockOptions[0].availableSizes[0] }

const selectedProductState = { products, selectProduct, selectedProduct: products[0], selectOption, selectedOption: mockOptions[0], selectSize, selectedSize: mockOptions[0].availableSizes[0] }

describe('App renders', () => {

  it('lands on root route and then reroutes to products page', () => {
    customRender(<RouterProvider router={router} />, defaultState)
    act(() => {
      router.navigate('/')
    })
    expect(router.state.location.pathname).toEqual('/products')
  });

  it('displays the product on the page', () => {
    customRender(<RouterProvider router={router} />, defaultState)

    const product1 = within(screen.getByTestId('section')).getByTestId('product-1').lastChild?.textContent

    expect(product1).toEqual('Fjallraven - Foldsack No. 1 Backpack, Fits 15...')
  })
})

describe('Select product', () => {

  customRender(<RouterProvider router={router} />, selectedProductState)

  it('routes to the product page with the right id', async () => {
    customRender(<RouterProvider router={router} />, selectedProductState)

    expect(router.state.location.pathname).toEqual('/products')

    const product1 = within(screen.getByTestId('section')).getByTestId('product-1')

    fireEvent.click(product1)

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/product/1'))
  })

})

