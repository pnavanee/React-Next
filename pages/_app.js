import '../styles/global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {wrapper, makeStore} from '../store';
import {Provider} from 'react-redux';

const store = makeStore();

const WrappedApp = ({ Component, pageProps }) => {

  return <Provider store={store}>
             <Component {...pageProps} />
        </Provider>
}

export default wrapper.withRedux(WrappedApp);
