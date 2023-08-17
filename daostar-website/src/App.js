import { Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Register from "./components/Register/Register";
import TopNavigation from "./components/TopNavigation/TopNavigation";
import RegistrationPage from "./components/RegistrationPage/RegistrationPage";
import ExplorePage from "./components/ExplorePage/ExplorePage";
import { WagmiConfig, createClient } from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "connectkit";
import { useQuery } from "@apollo/client";

import queries from "./components/ExplorePage/queries/registrations";

import "./App.css";
import "./bp4-theme.css";
import Eye from "./components/Homepage/Eye/Eye";

const alchemyId = process.env.ALCHEMY_ID;

const client = createClient(
    getDefaultClient({
        appName: "Your App Name",
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
    const goerliRes = useQuery(queries.REGISTRATIONS, {
        context: { apiName: "goerli" },
        variables: { id: "goerli" },
    });
    const optimismGoerliRes = useQuery(queries.REGISTRATIONS, {
        context: { apiName: "optimismGoerli" },
        variables: { id: "optimism-goerli" },
    }); 
    const {
        loading: optimismGoerliLoading,
        error: optimismGoerliError,
        data: optimismGoerliData,
    } = optimismGoerliRes;
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
    console.log({ mainnetData, goerliData, gnosisData, optimismGoerliData });

    if (error || goerliError || gnosisError| optimismGoerliError ) {
        console.error("Mainnet Error "+ error);
        console.error("Goerli Error "+ goerliError);
        console.error("Optimism Goerli Error "+ optimismGoerliError);
        console.error("Gnosis Error "+ gnosisError);
        return "Error";
    };
    if (loading || goerliLoading || gnosisLoading || optimismGoerliLoading) return "loading...";
    const mainnetRegistrations =
        mainnetData?.registrationNetwork?.registrations || [];
    const goerliRegistrations =
        goerliData?.registrationNetwork?.registrations || [];
    const optimismGoerliRegistrations =
        optimismGoerliData?.registrationNetwork?.registrations || [];
    const gnosisRegistrations =
        gnosisData?.registrationNetwork?.registrations || [];
    const registrationInstances = mainnetRegistrations.concat(
        goerliRegistrations,
        gnosisRegistrations,
        optimismGoerliRegistrations
    );

    console.log({ registrationInstances });

    



    

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
