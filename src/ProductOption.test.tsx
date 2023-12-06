import { screen } from '@testing-library/react';
import { RouterProvider } from "react-router-dom"
import { customRender, selectedProductState, router } from "./sharedTest"
import { act } from "react-dom/test-utils"


describe('Product options gives users controls to select product details', () => {
  it('should display the product options', () => {
    customRender(<RouterProvider router={router} />, selectedProductState)
    act(() => {
      router.navigate('/product/1')
    })
    expect(router.state.location.pathname).toEqual('/product/1')

    const optionsContainer = screen.getByText(selectedProductState.selectedOption.label)

    expect(optionsContainer).toBeInTheDocument()
  })

  it('should display the sizes available from the product option selected', () => {
    
  })


})