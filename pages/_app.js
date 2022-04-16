import '../styles/globals.css'
import Layout from '../components/Layout'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import reducer from '../lib/reducer.js'
import thunk from 'redux-thunk'

export const store = createStore(reducer, applyMiddleware(thunk))

export default function MyApp({
  Component,
  pageProps: { ...pageProps },
}) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

