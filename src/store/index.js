import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '../api/api-slice';

const stringMiddleWare = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
}

    const store = configureStore({
        reducer: {[apiSlice.reducerPath]: apiSlice.reducer},
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleWare, apiSlice.middleware),
        devTools: process.env.NODE_ENV !== 'production'
    })

export default store;