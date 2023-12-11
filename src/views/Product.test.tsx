import { renderHook, screen, within } from '@testing-library/react'

import { productContent } from '../sharedTest'

import { useFetchProduct } from '../hooks'
import { products as mockProducts } from '../testData'

describe('Product', () => {
  it.skip('should display the product', async () => {
    renderHook(() => useFetchProduct('1'), { wrapper: productContent })

    const sect = await screen.findByTestId('product-section')
    const productTitle = await within(sect).findByText(mockProducts[0].title)
    console.log('productTitle', productTitle)
  })
})