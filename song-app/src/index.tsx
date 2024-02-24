import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./index.css"
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import songsReducer from './slices/songSlice';
import songSaga from './saga/songSaga';

const saga = createSagaMiddleware();
const store = configureStore({
  reducer:{
    songs:songsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saga)
})

const s = saga.run(songSaga);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}> 
    
    <App />
   
    
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
