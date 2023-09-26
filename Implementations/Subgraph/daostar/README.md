# DAOStar Subgraph Indexer
This is a hosted subgraph indexer to index all the registered DAO on our supported networks.

## Supported networks
### Mainnet
https://api.thegraph.com/subgraphs/name/ipatka/daostar

### Optimism
https://api.thegraph.com/subgraphs/name/crazyyuan/daostar-optimism

### Goerli
https://api.thegraph.com/subgraphs/name/ipatka/daostar-goerli

### Optimism Goerli
https://api.thegraph.com/subgraphs/name/rashmi-278/daostar-optimism-goerli

### Arbitrum Goerli
https://api.thegraph.com/subgraphs/name/crazyyuan/daostar-arbitrum-goerli

### BNB Bruno
https://api.thegraph.com/subgraphs/name/crazyyuan/daostar-bnb-bruno

## Build and deploy instructions

1. Initalize access 
Get <Auth_Token> from your TheGraph Dashboard 

Deployment Access Auth Token:
graph auth --product hosted service  <Auth_Token>

2. Install node modules
```npm install ```

3. Refer to the scripts in package.json file and run necessary commands
Example:
Deploy to optimism-goerli:
Build:
```npm run build:optimism-goerli```
Deploy:
```npm run deploy:optimism-goerli```
