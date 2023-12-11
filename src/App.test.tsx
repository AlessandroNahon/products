/* eslint-disable testing-library/no-node-access */
import { act, render } from '@testing-library/react';

import { router, content } from './sharedTest';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('App renders', () => {
  it('lands on root route and then reroutes to products page', () => {
    render(content())
    act(() => {
      router.navigate('/')
    })
    expect(router.state.location.pathname).toEqual('/products')
  });
})


