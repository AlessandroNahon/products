import { fireEvent, screen } from '@testing-library/react';
import { RouterProvider } from "react-router-dom"
import { act } from "react-dom/test-utils"

import { customRender, selectedProductState, router } from "./sharedTest"
import { mockOptions } from './api';


describe('Product options gives users controls to select product details', () => {
  it('should display the product options', () => {
    customRender(<RouterProvider router={router} />, selectedProductState)
    act(() => {
      router.navigate('/product/1')
    })

    const optionsLabel = screen.getByText(selectedProductState.selectedOption.label)

    expect(optionsLabel).toBeInTheDocument()
  })

  it('should display the sizes available from the product option selected', () => {
    customRender(<RouterProvider router={router} />, selectedProductState)
    act(() => {
      router.navigate('/product/1')
    })

    const buttons = screen.getAllByRole('button')

    fireEvent.click(buttons[1])

    expect(selectedProductState.selectOption).toHaveBeenCalledWith(mockOptions[1])
    expect(selectedProductState.selectSize).toHaveBeenCalledWith('')
  })

})