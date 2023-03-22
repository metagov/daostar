import React from 'react'
import ReactDOM from 'react-dom/client'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import App from './App.js'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { FocusStyleManager } from '@blueprintjs/core'
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client'
import { createHttpLink } from 'apollo-link-http'
import { MultiAPILink } from '@habx/apollo-multi-endpoint-link'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

FocusStyleManager.onlyShowFocusOnTabs()

function getLibrary(provider) {
    return new Web3Provider(provider)
}

const client = new ApolloClient({
    link: ApolloLink.from([
        new MultiAPILink({
            endpoints: {
                goerli: `https://api.thegraph.com/subgraphs/name/ipatka/daostar-goerli`,
                mainnet: `https://api.thegraph.com/subgraphs/name/ipatka/daostar`,
            },
            // defaultEndpoint: 'https://api.thegraph.com/subgraphs/name/ipatka/daostar',
            httpSuffix: '',
            createHttpLink: createHttpLink,
        }),
    ]),
    cache: new InMemoryCache({
        typePolicies: {
            RegistrationInstance: {
                fields: {
                    daoName: {
                        read(daoName = null) {
                            return 'OVERRIDE'
                        },
                        merge(existing = [], incoming) {
                            console.log({ existing, incoming })
                            // return { ...existing, ...incoming }
                            return { a: 'b' }
                            // this part of code is depends what you actually need to do, in my
                            // case i had to save my incoming data as single object in cache
                        },
                    },
                },

                merge(existing = [], incoming) {
                    console.log({ existing, incoming })
                    // return { ...existing, ...incoming }
                    return { a: 'b' }
                    // this part of code is depends what you actually need to do, in my
                    // case i had to save my incoming data as single object in cache
                },
            },
        },
    }),
})

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
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
