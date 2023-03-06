import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from 'react-router-dom';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';
import { AuthProvider } from './components/context';

ReactDOM.render((
  // 
  <Provider store={store}>
    <AuthProvider>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
    </AuthProvider>
  </Provider>
),
  document.getElementById('root')
);

