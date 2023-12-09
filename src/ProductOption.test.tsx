import { fireEvent, screen, render } from '@testing-library/react';
import { RouterProvider } from "react-router-dom"
import { act } from "react-dom/test-utils"

import { selectedProductState, router } from "./sharedTest"
import { mockOptions } from './api';

describe('ProductOption allows users to select product options', () => {
  it('should display the product options', () => {
    render(<RouterProvider router={router} />)
    act(() => {
      router.navigate('/product/1')
    })

    const optionsLabel = screen.getByText(selectedProductState.selectedOption.label)

    expect(optionsLabel).toBeInTheDocument()
  })

  it('should display the sizes available from the product option selected', () => {
    render(<RouterProvider router={router} />)
    act(() => {
      router.navigate('/product/1')
    })

    const buttons = screen.getAllByRole('button')

    fireEvent.click(buttons[1])

    expect(selectedProductState.selectOption).toHaveBeenCalledWith(mockOptions[1])
    expect(selectedProductState.selectSize).toHaveBeenCalledWith('')
  })

  it('should display the unavailable sizes with disabled buttons', () => {
    render(<RouterProvider router={router} />)
    act(() => {
      router.navigate('/product/1')
    })

    const button = screen.getByText('sm')

    expect(button).toBeDisabled();

  })

})