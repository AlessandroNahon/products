/* eslint-disable testing-library/no-node-access */
import { fireEvent, screen, waitFor, render, renderHook } from '@testing-library/react'

import { router, wrapper } from '../sharedTest'

import { useFetchProducts } from '../hooks'
import { queryClient } from '../App'

const mockedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}))

beforeEach(() => {
  mockedNavigate.mockReset()
})

afterEach(() => {
  jest.restoreAllMocks()
  queryClient.clear()
})

describe('Products', () => {

  it('displays nothing if the products are not there', async () => {
    render(wrapper())

    const emptyDiv = screen.getByTestId('empty-section')

    expect(emptyDiv.firstChild).toBeNull()
  })

  it('displays the product on the page', async () => {
    renderHook(() => useFetchProducts(), { wrapper })

    const sect = await screen.findByTestId('section')
    const product1 = sect.firstChild?.textContent

    expect(product1).toEqual('Fjallraven - Foldsack No. 1 Backpack, Fits 15...')
  })

  it('routes to the product page with the selected id', async () => {
    renderHook(() => useFetchProducts(), { wrapper })

    expect(router.state.location.pathname).toEqual('/products')

    const sect = await screen.findByTestId('section')
    const product1 = sect.firstChild

    fireEvent.click(product1!)

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/product/1'))
  })

})

