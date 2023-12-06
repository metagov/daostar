import { Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Register from "./components/Register/Register";
import TopNavigation from "./components/TopNavigation/TopNavigation";
import RegistrationPage from "./components/RegistrationPage/RegistrationPage";
import ExplorePage from "./components/ExplorePage/ExplorePage";
import { WagmiConfig, createClient } from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "connectkit";
import { useQuery } from "@apollo/client";
import registrationIdsToFilter from "./components/FilterRegistrations/Filter_Registrations_By_Id";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";
import useAxios from "axios-hooks";
import queries from "./components/ExplorePage/queries/registrations";
import "./App.css";
import "./bp4-theme.css";
import Eye from "./components/Homepage/Eye/Eye";
import { useEffect, useState } from "react";
import axios from "axios";
import { mockExploreData } from "./components/ExplorePage/mockExploreData";
const mainnetOldClient = new ApolloClient({
  link: createHttpLink({
    uri: "https://api.thegraph.com/subgraphs/name/rashmi-278/daostar-ethereum-mainnet-v0",
  }),
  cache: new InMemoryCache(),
});

const alchemyId = process.env.REACT_APP_ALCHEMY_ID;
const walletConnectId = process.env.REACT_APP_WALLETCONNECT_ID;
const token = process.env.REACT_APP_BEARER_TOKEN;

const client = createClient(
  getDefaultClient({
    appName: "DAOstar",
    alchemyId,
  })
);

function App() {
  //DAODAOINT START

  const apiUrl = "https://search.daodao.zone/indexes/daos/documents?limit=100";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const [daodaoRegistrationInstances, setDaoDao] = useState(undefined);
  useEffect(() => {
    async function getDAODAO() {
      try {
        const response = await axios.get(apiUrl, { headers });

        // Axios automatically throws an error for non-2xx responses, so no need to check response.ok
        const data = response.data;
        const structuredData = data.results.map((item) => ({
          contractAddress: item.contractAddress,
          name: item.value.config.name,
          daoURI: item.value.config.dao_uri || "",
          description: item.value.config.description,
          id: item.value.voting_module,
          createdAt: new Date(item.value.createdAt),
          network: "daodao",
          managerAddress: "",
          standalone: "true",
          membersURI: "Please refer DAO URI",
          activityLogURI: "Please refer DAO URI",
          issuersURI: "Please refer DAO URI",
          proposalsURI: "Please refer DAO URI",
          governanceURI: "Please refer DAO URI",
        }));

        console.log("Axios structured data:", structuredData);
        setDaoDao(structuredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getDAODAO();
  }, []);

  //DAODAOINT END
  const {
    loading,
    error,
    data: mainnetData,
  } = useQuery(queries.REGISTRATIONS, {
    context: { apiName: "mainnet" },
    variables: { id: "mainnet" },
  });

  const {
    loading: mainnetv0Loading,
    error: mainnetv0Error,
    data: mainnetv0Data,
  } = useQuery(queries.REGISTRATIONSOLD, {
    client: mainnetOldClient,
    context: { apiName: "mainnet" },
    variables: { id: "mainnet" },
  });

  const goerliRes = useQuery(queries.REGISTRATIONS, {
    context: { apiName: "goerli" },
    variables: { id: "goerli" },
  });
  const optimismGoerliRes = useQuery(queries.REGISTRATIONS, {
    context: { apiName: "optimismGoerli" },
    variables: { id: "optimism-goerli" },
  });
  const arbitrumGoerliRes = useQuery(queries.REGISTRATIONS, {
    context: { apiName: "arbitrumGoerli" },
    variables: { id: "arbitrum-goerli" },
  });
  const chapelRes = useQuery(queries.REGISTRATIONS, {
    context: { apiName: "chapel" },
    variables: { id: "chapel" },
  });

  const optimismRes = useQuery(queries.REGISTRATIONS, {
    context: { apiName: "optimism" },
    variables: { id: "optimism" },
  });

  const {
    loading: goerliLoading,
    error: goerliError,
    data: goerliData,
  } = goerliRes;

  const gnosisRes = useQuery(queries.REGISTRATIONS, {
    context: { apiName: "gnosis" },
    variables: { id: "gnosis" },
  });
  const {
    loading: optimismLoading,
    error: optimismError,
    data: optimismData,
  } = optimismRes;

  const {
    loading: optimismGoerliLoading,
    error: optimismGoerliError,
    data: optimismGoerliData,
  } = optimismGoerliRes;
  const {
    loading: arbitrumGoerliLoading,
    error: arbitrumGoerliError,
    data: arbitrumGoerliData,
  } = arbitrumGoerliRes;
  const {
    loading: chapelLoading,
    error: chapelError,
    data: chapelData,
  } = chapelRes;

  const {
    loading: gnosisLoading,
    error: gnosisError,
    data: gnosisData,
  } = gnosisRes;

 

  if (
    error ||
    goerliError ||
    optimismGoerliError ||
    arbitrumGoerliError ||
    chapelError ||
    optimismError ||
    mainnetv0Error
  ) {
    console.error("Mainnet Error " + error);
    console.error("Mainnet v0 Error " + mainnetv0Error);
    console.error("Goerli Error " + goerliError);
    console.error("Optimism Goerli Error " + optimismGoerliError);
    console.error("Arbitrum Goerli Error" + arbitrumGoerliError);
    console.error("Chapel Error" + chapelError);
    console.error("Optimism Error" + optimismError);
  }
  if (
    loading ||
    goerliLoading ||
    gnosisLoading ||
    optimismGoerliLoading ||
    arbitrumGoerliLoading ||
    chapelLoading ||
    optimismLoading
  )
    return "loading...";
  const mainnetRegistrations =
    mainnetData?.registrationNetwork?.registrations || [];
  const mainnetv0Registrations =
    mainnetv0Data?.registrationNetwork?.registrations || [];
  const goerliRegistrations =
    goerliData?.registrationNetwork?.registrations || [];
  const optimismGoerliRegistrations =
    optimismGoerliData?.registrationNetwork?.registrations || [];
  const optimismRegistrations =
    optimismData?.registrationNetwork?.registrations || [];
  const gnosisRegistrations =
    gnosisData?.registrationNetwork?.registrations || [];
  const arbitrumGoerliRegistrations =
    arbitrumGoerliData?.registrationNetwork?.registrations || [];
  const chapelRegistrations =
    chapelData?.registrationNetwork?.registrations || [];

  // This object clones and modifies the mainnetV0 registration instances to change the network ID to "ethereum"
  // So that when we click on an old registration instance card we are able to view and edit its proprties
  // this allows to query mainnetV0 subgraph link

  const allMainnetV0Registrations = mainnetv0Registrations.map((instance) => ({
    ...instance,
    registrationNetwork: {
      ...instance.registrationNetwork,
      id: "ethereum",
    },
  }));
  // Restructure data
  const restructuredData = [
    {
      registrationNetwork: {
        __typename: "RegistrationNetwork",
        id: "junos",
        registrations: daodaoRegistrationInstances.map((item) => ({
          __typename: "RegistrationInstance",
          id: item.id,
          daoName: item.name, // Use the name property for daoName
          daoAddress: item.contractAddress, // Use the contractAddress property for daoAddress
          daoDescription: item.description,
          daoURI: item.daoURI,
          governanceURI: item.governanceURI,
          issuersURI: item.issuersURI,
          managerAddress: item.managerAddress,
          membersURI: item.membersURI,
          proposalsURI: item.proposalsURI,
          registrationAddress: item.contractAddress, // Use the contractAddress property for registrationAddress
          registrationNetwork: {
            __typename: "RegistrationNetwork",
            id: "junos",
          },
        })),
      },
    },
  ];
  


  const allRegistrationInstances = mainnetRegistrations
    .concat(
    allMainnetV0Registrations,
    // goerliRegistrations,
    // gnosisRegistrations,
    // optimismGoerliRegistrations,
    // arbitrumGoerliRegistrations,
    // chapelRegistrations,
    // optimismRegistrations,
    );


  const daodaoInstances = restructuredData;
  const registrationInstances = allRegistrationInstances.filter(
    (instance) => !registrationIdsToFilter.includes(instance.id)
  );

  console.log("Restructured Data:", restructuredData);

  

  console.log({
    // mainnetData,
    mainnetv0Data,
    mockExploreData,
    restructuredData,
    // goerliData,
    // gnosisData,
    // optimismGoerliData,
    // arbitrumGoerliData,
    // chapelData,
  });

  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider
        mode="dark"
        customTheme={{
          "--ck-font-family":
            "IBM Plex Mono, 'Roboto Condensed', 'Roboto', 'Arial', sans-serif",
        }}
        options={{
          hideNoWalletCTA: true,
          walletConnectName: "WalletConnect",
          showAvatar: false,
          hideQuestionMarkCTA: true,
        }}
      >
        <div className="App">
          <TopNavigation />
          {/* <Homepage /> */}

          <Routes>
            <Route path="/eye" element={<Eye />} />
            <Route path="/register" element={<Register />} />
            <Route path="/registration/:regID" element={<RegistrationPage />} />
            <Route
              path="/explore"
              element={
                <ExplorePage registrationInstances={registrationInstances}  daodaoInstances={daodaoInstances} />
              }
            />
            <Route
              path="/"
              element={
                <Homepage registrationInstances={registrationInstances} />
              }
            />
            <Route
              path="/creative-universe"
              component={() => {
                window.location.href =
                  "https://github.com/metagov/daostar/discussions/41";
                return null;
              }}
            />
          </Routes>
        </div>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

if (window.location.path === "creative-universe") {
  window.location = "https://github.com/metagov/daostar/discussions/41";
}

export default App;
