import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import { Env, NODE_ENV } from '../constants';
import appSlice from './appSlice';
import messageReducer from './messageSlice';
import {
    AppState,
    MessageState
} from './state';

interface Reducer<T> {
    app: AppState & T;
    message: MessageState & T;
}

const isProduction = NODE_ENV === Env.Production;

const [
    appPersistor,
    messagePersistor
] = [
    { key: 'app', storage, blacklist: [] },
    { key: 'message', storage, whitelist: [] }
];

export const store = configureStore({
    reducer: combineReducers<Reducer<PersistPartial>>({
        app: persistReducer<AppState>(appPersistor, appSlice),
        message: persistReducer<MessageState>(messagePersistor, messageReducer)
    }),
    middleware: (getDefaultMiddleware) => {
        const middleware = getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        });

        if (!isProduction) {
            return middleware.concat(logger);
        }

        return middleware;
    },
    devTools: !isProduction,
    preloadedState: {},
    enhancers: []
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
