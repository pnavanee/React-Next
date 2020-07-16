import '../styles/global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import { useStore } from '../store'

const WrappedApp = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState)

  return <Provider store={store}>
             <Component {...pageProps} />
        </Provider>
}

export default WrappedApp;
