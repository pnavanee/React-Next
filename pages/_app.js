import '../styles/global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {wrapper, initStore} from '../store';
import React from 'react';
import App, {AppInitialProps, AppContext} from 'next/app';
import {Provider} from 'react-redux';

class WrappedApp extends App {

  static getInitialProps = async ({Component, ctx}) => {
    // Keep in mind that this will be called twice on server, one for page and second for error page
    ctx.store.dispatch({type: 'APP', payload: 'was set in _app'});

    return {
        pageProps: {
            // Call page-level getInitialProps
            ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
            // Some custom thing for all pages
            appProp: ctx.pathname,
        },
    };
};

render() {
    const {Component, pageProps} = this.props;
    return <Component {...pageProps} />;
}
}

export default wrapper.withRedux(WrappedApp);
