import { Route, Routes } from "react-router-dom";
import { WagmiConfig, createClient } from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "connectkit";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";

import Homepage from "./components/Homepage/Homepage";
import Register from "./components/Register/Register";
import TopNavigation from "./components/TopNavigation/TopNavigation";
import RegistrationPage from "./components/RegistrationPage/RegistrationPage";
import ExplorePage from "./components/ExplorePage/ExplorePage";
import Eye from "./components/Homepage/Eye/Eye";
import POCRegistrationPage from "./pages/POCRegistrationPage";

import "./App.css";
import "./bp4-theme.css";
import POCExplorePage from "./pages/POCExplorePage";

const alchemyId = process.env.ALCHEMY_ID;

Amplify.configure(awsExports);

const client = createClient(
  getDefaultClient({
    appName: "Your App Name",
    alchemyId,
  })
);

function App() {
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
            <Route path="/test/register" element={<POCRegistrationPage />} />
            <Route path="/test/explore" element={<POCExplorePage />} />
            <Route path="/registration/:regID" element={<RegistrationPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/" element={<Homepage />} />
          </Routes>
        </div>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

export default App;
