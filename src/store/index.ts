import createSagaMiddleware from 'redux-saga'
import createStore from './createStore'
import rootReducer from './ducks/rootReducer'
import { persistStore } from 'redux-persist'
import persistReducer from './persistReducer'
import rootSaga from './ducks/rootSaga'

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null

const sagaMiddleware = createSagaMiddleware({ sagaMonitor })

const middlewares = [sagaMiddleware]

const store = createStore(persistReducer(rootReducer), middlewares)
const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)

export { store, persistor }
