import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {},
});

function cartReducer( state, action) {
    if (action.type === 'ADD_ITEM') {
        // ... update state to add item
        const existingCardItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );

        const updatedItems = [...state.items];

        if(existingCardItemIndex > -1) {
            const existingItem = state.items[existingCardItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1,
            };
            updatedItems[existingCardItemIndex] = updatedItem;
        } else {
            updatedItems.push({...action.item, quantity: 1});
        }

        return { ...state, items: updatedItems };
    }

    if (action.type === 'REMOVE_ITEM') {
        // ... remove item from the state
        const existingCardItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );

        const existingCardItem = state.items[existingCardItemIndex];

        const updatedItems = [...state.items];
        if (existingCardItem.quantity === 1) {

            updatedItems.splice(existingCardItemIndex, 1);
        } else {
            const updatedItem = {
                ...existingCardItem,
                quantity: existingCardItem.quantity - 1,
            };
            updatedItems[existingCardItemIndex] = updatedItem;
        }

        return { ...state, items: updatedItems };
    }

    if(action.type === 'CLEAR_CART') {
        return {...state, items: []}
    }

    return state;
}

export function CartContextProvider ( {children} ) {

    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });
    
    function addItem(item) {
        dispatchCartAction({type: 'ADD_ITEM', item});
    }

    function removeItem(id) {
        dispatchCartAction({type: "REMOVE_ITEM", id});
    }

    function clearCart() {
        dispatchCartAction({type: 'CLEAR_CART'});
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
        clearCart,
    };

    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}

export default CartContext;