/* eslint-disable testing-library/no-node-access */
import { act, render, screen, waitFor, within } from '@testing-library/react'

import { router, wrapper } from '../sharedTest'

import { products as mockProducts } from '../testData'

describe('Product', () => {
	it('should display the product', async () => {
		render(wrapper())
		act(() => {
			router.navigate(`/product/${mockProducts[1].id}`)
		})
		const sect = await screen.findByTestId('product-section')
		const productTitle = await waitFor(() =>
			within(sect).findByText(mockProducts[1].title)
		)

		expect(productTitle.firstChild?.textContent).toEqual(
			'Mens Casual Premium Slim Fit T-Shirts '
		)
	})
})
