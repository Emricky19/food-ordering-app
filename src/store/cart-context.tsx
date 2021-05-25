import { createContext } from 'react'

import Item from '../model/Item'

export type iCartContext = {
    items: Item[],
    totalAmount: number,
    addItem: (item: Item) => void,
    removeItem: (id: string) => void
}

const cartContext = createContext<iCartContext>({
    items: [],
    totalAmount: 0.0,
    addItem: (item) => {},
    removeItem: (id) => {}
})

export default cartContext