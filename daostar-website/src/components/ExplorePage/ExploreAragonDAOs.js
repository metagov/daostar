import React, { useState } from "react";
import RegistrationCard from "../RegistrationCard/RegistrationCard";
import AttestationCard from "../AttestationCard/AttestationCard";
import "./ExplorePage.css";
import { InputGroup, Button } from "@blueprintjs/core";

// Prelimnary check filter, if a DAO has no name, it won't be displayed
export const filterRegistrations = (registration, filterVal = "") => {
  if (!registration.daoName) {
    return false;
  }
  if (filterVal !== "") {
    return registration.daoName.toLowerCase().includes(filterVal.toLowerCase());
  }
  return true;
};

// Network Filter for EVM Chains
export const NetworkFilterRegistrations = (registration, filterVal = "") => {
  console.log(registration.registrationNetwork.id);
  if (registration.registrationNetwork.id === filterVal) {
    return true;
  }
  if (filterVal === "ethereum") {
    if (
      (registration.registrationNetwork.id === filterVal) |
      (registration.registrationNetwork.id === "mainnet")
    ) {
      return true;
    }
  }
};

const NetworkButtons = [
  { text: "All", filter: "all" },
  { text: "Arbitrum", filter: "arbitrum" },
  { text: "Base", filter: "base" },
  { text: "Ethereum", filter: "ethereum" },
  { text: "Goerli", filter: "goerli" },
  { text: "Polygon", filter: "polygon" },
  { text: "Arbitrum Goerli", filter: "arbitrum-goerli" },
  { text: "Sepolia", filter: "sepolia" },
];
NetworkButtons.sort((a, b) => a.text.localeCompare(b.text));

const ExplorePage = ({
  aragonBase,
  aragonArbitrum,
  aragonEthereum,
  aragonGoerli,
  aragonPolygon,
  aragonSepolia,
  aragonArbitrumGoerli,
}) => {
  const [filterVal, setFilterVal] = useState("");
  const onChangeFilter = (e) => setFilterVal(e.target.value);
  const [networkFilter, setNetworkFilter] = useState("all");

  const filteredRegistrations = (instances) => {
    return instances
      .flatMap((network) =>
        network.registrationNetwork.registrations.filter((reg) =>
          filterRegistrations(reg, filterVal)
        )
      )
      .map((registration, i) => (
        <RegistrationCard
          key={i}
          {...registration}
          standalone={true}
          displayWithoutEdit={true}
        />
      ));
  };

  const renderCards = () => {
    switch (networkFilter) {
      case "arbitrum-goerli":
        return filteredRegistrations(aragonArbitrumGoerli);

      case "base":
        return filteredRegistrations(aragonBase);

      case "arbitrum":
        return filteredRegistrations(aragonArbitrum);

      case "polygon":
        return filteredRegistrations(aragonPolygon);

      case "sepolia":
        return filteredRegistrations(aragonSepolia);

      case "ethereum":
        return filteredRegistrations(aragonEthereum);

      case "goerli":
        return filteredRegistrations(aragonGoerli);

      default:
        return (
          <>
            <div className="dao-cards">{filteredRegistrations(aragonEthereum)}</div>
            <br></br>
    
          </>
        );
    }
  };



  return (
    <div className="explore-page">
      <div className="filter">
        <InputGroup
          large
          placeholder="Filter DAOs..."
          value={filterVal}
          onChange={onChangeFilter}
        />
        <div>
          {NetworkButtons.map((button, index) => (
            <Button
              key={index}
              text={button.text}
              onClick={() => setNetworkFilter(button.filter)}
              className={
                networkFilter === button.filter ? "button-highlighted" : ""
              }
            />
          ))}
        </div>
      </div>

      <div className="dao-cards">{renderCards()}</div>
    </div>
  );
};

export default ExplorePage;
