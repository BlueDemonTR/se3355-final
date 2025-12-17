import { combineReducers, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

// defaults to localstorage on web, AsyncStorage on react-native
import storage from 'redux-persist/lib/storage'

// import reducers
import appState from './reducers/appState'
import user from './reducers/user'
import cards from './reducers/cards'
import lobby from './reducers/lobby'

const rootPersistConfig = {
	key: 'root',
	storage: storage,
	stateReconciler: hardSet,
	timeout: null,
	blacklist: [],
}

const rootReducer = combineReducers({
	appState,
	user,
	cards,
	lobby
})

const pReducer = persistReducer(rootPersistConfig, rootReducer)

export const store = createStore(pReducer)
export const persistor = persistStore(store)
