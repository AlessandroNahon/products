import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { productOptionContent, mockBaseProps } from "../sharedTest"
import { mockOptions } from '../api';

describe('ProductOption allows users to select product options', () => {

  it('should display the product options', async () => {
    render(productOptionContent)

    const optionsLabel = await screen.findByText(mockOptions[0].label)

    await waitFor(() => expect(optionsLabel).toBeInTheDocument())
  })

  it('should display the sizes available from the product option selected', async () => {
    render(productOptionContent)

    const buttons = await screen.findAllByRole('button')

    fireEvent.click(buttons[1])

    await waitFor(() => expect(mockBaseProps.setSelectedOption).toHaveBeenCalledWith(mockOptions[1]))
    await waitFor(() => expect(mockBaseProps.setSelectedSize).toHaveBeenCalledWith(''))
  })

  it('should display the unavailable sizes with disabled buttons', async () => {
    render(productOptionContent)

    const button = await screen.findByText('sm')

    expect(button).toBeDisabled();

  })

})