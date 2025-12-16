import { combineReducers, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

// defaults to localstorage on web, AsyncStorage on react-native
import storage from 'redux-persist/lib/storage'

// import reducers
import appState from './reducers/appState'
import data from './reducers/data'
import pokemon from './reducers/pokemon'
import games from './reducers/games'
import regions from './reducers/regions'

const rootPersistConfig = {
	key: 'root',
	storage: storage,
	stateReconciler: hardSet,
	timeout: null,
	blacklist: [],
}

const rootReducer = combineReducers({
	appState,
  data,
	pokemon,
	games,
	regions
})

const pReducer = persistReducer(rootPersistConfig, rootReducer)

export const store = createStore(pReducer)
export const persistor = persistStore(store)
