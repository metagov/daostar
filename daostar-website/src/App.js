import { Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Register from "./components/Register/Register";
import TopNavigation from "./components/TopNavigation/TopNavigation";
import RegistrationPage from "./components/RegistrationPage/RegistrationPage";
import ExplorePage from "./components/ExplorePage/ExplorePage";
import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { useQuery } from "@apollo/client";
import registrationIdsToFilter from "./components/FilterRegistrations/Filter_Registrations_By_Id";

import queries from "./components/ExplorePage/queries/registrations";

import "./App.css";
import "./bp4-theme.css";
import Eye from "./components/Homepage/Eye/Eye";

const alchemyId = process.env.ALCHEMY_ID;

const config = createConfig(
    getDefaultConfig({
        appName: "DAOstar",
        alchemyId,
    })
);

function App() {
    const {
        loading,
        error,
        data: mainnetData,
    } = useQuery(queries.REGISTRATIONS, {
        context: { apiName: "mainnet" },
        variables: { id: "mainnet" },
    });
    const mainnetv0Res = useQuery(queries.REGISTRATIONS, {
        context: { apiName: "mainnetv0" },
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
        loading: mainnetv0Loading,
        error: mainnetv0Error,
        data: mainnetv0Data,
    } = mainnetv0Res;
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
        loading: goerliLoading,
        error: goerliError,
        data: goerliData,
    } = goerliRes;
    const gnosisRes = useQuery(queries.REGISTRATIONS, {
        context: { apiName: "gnosis" },
        variables: { id: "gnosis" },
    });
    const {
        loading: gnosisLoading,
        error: gnosisError,
        data: gnosisData,
    } = gnosisRes;
    console.log({ mainnetData, goerliData, gnosisData, optimismGoerliData, arbitrumGoerliData, chapelData, mainnetv0Data });

    if (error || goerliError || optimismGoerliError || arbitrumGoerliError || chapelError || optimismError || mainnetv0Error ) {
        console.error("Mainnet Error "+ error);
        console.error("Mainnet  v0 Error "+ mainnetv0Error);
        console.error("Goerli Error "+ goerliError);
        console.error("Optimism Goerli Error "+ optimismGoerliError);
        console.error("Arbitrum Goerli Error" + arbitrumGoerliError);
        console.error("Chapel Error" + chapelError);
        console.error("Optimism Error" + optimismError)
    };
    if (loading || mainnetv0Loading || goerliLoading || gnosisLoading || optimismGoerliLoading || arbitrumGoerliLoading || chapelLoading || optimismLoading) return "loading...";
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
    const allRegistrationInstances = mainnetRegistrations.concat(
        mainnetv0Registrations,
        goerliRegistrations,
        gnosisRegistrations,
        optimismGoerliRegistrations,
        arbitrumGoerliRegistrations,
        chapelRegistrations,
        optimismRegistrations
    );

    const registrationInstances = allRegistrationInstances.filter((instance) => 
        !registrationIdsToFilter.includes(instance.id)
    )
    


    return (
        <WagmiConfig config={config}>
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
                        <Route
                            path="/registration/:regID"
                            element={<RegistrationPage />}
                        />
                        <Route
                            path="/explore"
                            element={
                                <ExplorePage
                                    registrationInstances={
                                        registrationInstances
                                    }
                                />
                            }
                        />
                        <Route
                            path="/"
                            element={
                                <Homepage
                                    registrationInstances={
                                        registrationInstances
                                    }
                                />
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
