/* eslint-disable testing-library/no-node-access */
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { ProductContext, ProductContextType, routes } from './App';
import { products } from './testData'

import { RouterProvider, createMemoryRouter } from 'react-router-dom'

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

describe('App renders', () => {

  it('lands on root route and then reroutes to products page', () => {
    customRender(<RouterProvider router={router} />, { products, selectProduct: () => null, selectedProduct: [] })
    act(() => {
      router.navigate('/')
    })
    expect(router.state.location.pathname).toEqual('/products')
  });

  it('displays the product on the page', () => {
    const selectProduct = jest.fn();
    customRender(<RouterProvider router={router} />, { products, selectProduct, selectedProduct: [] })

    const product1 = within(screen.getByTestId('section')).getByTestId('product-1').lastChild?.textContent

    expect(product1).toEqual('Fjallraven - Foldsack No. 1 Backpack, Fits 15...')
  })
})

describe('Select product', () => {
  const selectProduct = jest.fn();
  customRender(<RouterProvider router={router} />, { products, selectProduct, selectedProduct: products[0] })


  it('routes to the product page with the right id', async () => {
    customRender(<RouterProvider router={router} />, { products, selectProduct: () => null, selectedProduct: products[0] })

    expect(router.state.location.pathname).toEqual('/products')

    const product1 = within(screen.getByTestId('section')).getByTestId('product-1')

    fireEvent.click(product1)

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/product/1'))
  })

})

