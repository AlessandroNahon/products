import { act, render } from '@testing-library/react'

import { router, wrapper } from './sharedTest'

afterEach(() => {
	jest.restoreAllMocks()
})

describe('App renders', () => {
	it('lands on root route and then reroutes to products page', () => {
		render(wrapper)
		act(() => {
			router.navigate('/')
		})
		expect(router.state.location.pathname).toEqual('/products')
	})
})
