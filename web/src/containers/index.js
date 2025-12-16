import React from 'react'

// redux store
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from 'store'
// router
import { HashRouter as Router } from 'react-router-dom'
import { ErrRes } from 'components'
import Auth from './Auth'

const Root = () => (
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<ErrRes/>
			<Router>
				<Auth />
			</Router>
		</PersistGate>
	</Provider>
)

export default Root
