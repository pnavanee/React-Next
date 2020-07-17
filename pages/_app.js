import '../styles/global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {wrapper, initStore} from '../store';
import {Provider} from 'react-redux';

const WrappedApp = ({ Component, pageProps }) => {

  return <Component {...pageProps} />
}

export default wrapper.withRedux(WrappedApp);
