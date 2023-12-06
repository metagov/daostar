import React from "react";
import ReactDOM from "react-dom/client";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { FocusStyleManager } from "@blueprintjs/core";
import {
    ApolloClient,
    ApolloLink,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client";
import { createHttpLink } from "apollo-link-http";
import { MultiAPILink } from "@habx/apollo-multi-endpoint-link";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

FocusStyleManager.onlyShowFocusOnTabs();

function getLibrary(provider) {
    return new Web3Provider(provider);
}


const client = new ApolloClient({
    link: ApolloLink.from([
        new MultiAPILink({
            endpoints: {
                goerli: `https://api.thegraph.com/subgraphs/name/ipatka/daostar-goerli`,
                optimismGoerli: `https://api.thegraph.com/subgraphs/name/rashmi-278/daostar-optimism-goerli`,
                mainnet: `https://api.thegraph.com/subgraphs/name/ipatka/daostar`,
                gnosis: `https://api.thegraph.com/subgraphs/name/rashmi-278/daostar-gnosis`,
                arbitrumGoerli: `https://api.thegraph.com/subgraphs/name/rashmi-278/daostar-arbitrum-goerli`,
                chapel:`https://api.thegraph.com/subgraphs/name/rashmi-278/daostar-bnb-bruno`,
                optimism: `https://api.thegraph.com/subgraphs/name/rashmi-278/daostar-optimism`,
                ethereum: "https://api.thegraph.com/subgraphs/name/rashmi-278/daostar-ethereum-mainnet-v0",
                junos: "",
                osmosis:"",
                stargaze: ""
            },
            //defaultEndpoint: 'https://api.thegraph.com/subgraphs/name/ipatka/daostar',
            httpSuffix: "",
            createHttpLink: createHttpLink,
        }),
    ]),
    cache: new InMemoryCache({}),
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
