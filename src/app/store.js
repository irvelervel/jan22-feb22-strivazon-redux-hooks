import { configureStore, combineReducers } from '@reduxjs/toolkit'
import cartReducer from '../slices/cart/cartSlice'
import userReducer from '../slices/user/userSlice'
import bookReducer from '../slices/book/bookSlice'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // <-- this is the localStorage engine
import { encryptTransform } from 'redux-persist-transform-encrypt'

const reducers = combineReducers({
  cart: cartReducer,
  // the name "cart" should match the name of the slice!
  user: userReducer,
  book: bookReducer,
})

const persistConfig = {
  key: 'root', // <-- the key property tells the persistency which part of the store to save/rehydrate. with 'root', we're persisting the whole redux store
  // now let's give redux-persist the engine, the technology we want to use for writing down the state before refreshing
  storage: storage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_PERSIST_KEY,
    }),
  ],
}

const persistedReducer = persistReducer(persistConfig, reducers)

export default configureStore({
  // let's define our reducers
  reducer: persistedReducer,
})

// this file is just setting up the Redux Store, and this implementation is valid for ANY JS application
// we want now to provide this engine to our REACT application! we have to inform our Components about it

// SLICES
// slices in Redux are store chunks. you can have as many slices as you like.
// every slice/chunk is going to be self-mantained.
// let's create a slice for the cart!
