import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { mockOptions } from '../api'
import { mockProductOptionProps, productOptionContent } from '../sharedTest'

describe('ProductOption', () => {
	it('should display the product options', async () => {
		render(productOptionContent)

		const optionsLabel = await screen.findByText(mockOptions[0].label)

		await waitFor(() => expect(optionsLabel).toBeInTheDocument())
	})

	it('should display the sizes available from the product option selected', async () => {
		render(productOptionContent)

		const buttons = await screen.findAllByRole('button')

		fireEvent.click(buttons[1])

		await waitFor(() =>
			expect(mockProductOptionProps.setSelectedOption).toHaveBeenCalledWith(
				mockOptions[1]
			)
		)
		await waitFor(() =>
			expect(mockProductOptionProps.setSelectedSize).toHaveBeenCalledWith('')
		)
	})

	it('should display the unavailable sizes with disabled buttons', async () => {
		render(productOptionContent)

		const button = await screen.findByText('sm')

		expect(button).toBeDisabled()
	})
})
