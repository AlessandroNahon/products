import React, { useContext, type ReactElement, useEffect } from 'react'
import { mockOptions } from './api'
import { ProductContext, Size } from './App'

import Image from './Image'

const sizes: Size[] = ['xs', 'sm', 'md', 'lg', 'xl']

export default function ProductOptionComponent(): ReactElement {
  const { selectedOption, selectOption, selectedSize, selectSize } = useContext(ProductContext)

  useEffect(() => {
    selectOption(mockOptions[0])
    selectSize('')
  }, [selectOption, selectSize])

  return (
    <div>
      <h3>{selectedOption.label}</h3>
      <div className='grid lg:grid-cols-6 gap-0 justify-items-stretch auto-rows-max mt-2'>
        {mockOptions.map(o => (
          <button key={o.label} className={`w-20 ${selectedOption.label === o.label ? "ring-2" : ''}`} onClick={() => {
            selectOption(o)
            selectSize('')
          }}>
            <Image key={o.label} className="aspect-square bg-center bg-cover bg-no-repeat" image={o.image} />
          </button>
        ))}
      </div>
      <div className='mt-5'>
        <h3>Sizes</h3>
        <div className='grid lg:grid-cols-5 gap-1 auto-rows-max mt-2'>
          {sizes.map(s => (
            <button key={s} disabled={!selectedOption.availableSizes.some(as => s === as)} className={`${selectedSize === s ? 'bg-indigo-600 text-white' : ''} border-2 disabled:bg-slate-50 disabled:border-0 px-10 py-3`} onClick={() => selectSize(s)}>{s}</button>
          ))}
        </div>

      </div>
    </div>

  )
}
