import React from 'react';
import ReactDOM from 'react-dom/client';
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from "@ethersproject/providers";
import App from './App.js';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { FocusStyleManager } from "@blueprintjs/core";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

FocusStyleManager.onlyShowFocusOnTabs();

function getLibrary(provider) {
  return new Web3Provider(provider);
}

const client = new ApolloClient({
  uri: `https://api.studio.thegraph.com/query/38146/daostar-goerli/0.2`,
  cache: new InMemoryCache(),
});

root.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </BrowserRouter>
    </Web3ReactProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
