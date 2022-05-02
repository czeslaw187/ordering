import '../styles/globals.css'
// import Layout from '../components/Layout'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import reducer from '../lib/reducer.js'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'

const persistConfig = {
  key: process.env.NEXT_PUBLIC_REDUX_PERSIST,
  storage
}

const persistedReducer = persistReducer(persistConfig, reducer)
let store = createStore(persistedReducer, applyMiddleware(thunk))
let persistor = persistStore(store)

export default function MyApp({
  Component,
  pageProps: { ...pageProps },
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <Layout> */}
          <Component {...pageProps} />
        {/* </Layout> */}
      </PersistGate>      
    </Provider>
  )
}

