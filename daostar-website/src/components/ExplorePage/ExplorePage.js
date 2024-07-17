import React, { useEffect, useState } from "react";
import RegistrationLeanCard from "../RegistrationCard/RegistrationLeanCard";
import AttestationCard from "../AttestationCard/AttestationCard";
import ENSCard from "../ENSCard/ENSCard";
import "./ExplorePage.css";
import { InputGroup, Button } from "@blueprintjs/core";
import { filterEASbyId } from "../FilterRegistrations/Filter_Registrations_By_Id";
import RegistrationCard from "../RegistrationCard/RegistrationCard";

// Prelimnary check filter, if a DAO has no name, it won't be displayed
export const filterRegistrations = (registration, filterVal = "") => {
  // Check if daoName is present and not empty
  if (!registration.daoName || registration.daoName.trim() === "") {
    return false;
  }

  // Omit dev test address
  if (registration.daoAddress === "0xDeb9e5915Db81011C549799A9EA37EdE4d72EFBA") {
    return false;
  }

  const daoNameLower = registration.daoName.toLowerCase();
  const filterWords = ["scam", "test", "fuck"];

  // Check for excluded words
  if (filterWords.some((filterWord) => daoNameLower.includes(filterWord))) {
    return false;
  }

  // Check if a specific filter value is provided and included in the daoName
  return filterVal === "" || daoNameLower.includes(filterVal.toLowerCase());
};

// Network Filter for EVM Chains
export const NetworkFilterRegistrations = (registration, filterVal = "") => {
  if (registration.registrationNetwork.id === filterVal) {
    return true;
  }
  if (filterVal === "ethereum") {
    if (
      registration.registrationNetwork.id === filterVal ||
      registration.registrationNetwork.id === "mainnet"
    ) {
      return true;
    }
  }
  return false;
};

const NetworkButtons = [
  { text: "All", filter: "all" },
  { text: "Arbitrum", filter: "arbitrum-one" },
  { text: "Arbitrum-Goerli", filter: "arbitrum-goerli" },
  { text: "BNB Bruno", filter: "chapel" },
  { text: "Ethereum", filter: "ethereum" },
  { text: "Gnosis", filter: "gnosis" },
  { text: "Goerli", filter: "goerli" },
  { text: "Juno", filter: "juno" },
  { text: "Optimism", filter: "optimism" },
  { text: "Optimism-Goerli", filter: "optimism-goerli" },
  { text: "Osmosis", filter: "osmosis" },
  { text: "Stargaze", filter: "stargaze" },
  { text: "EAS", filter: "easAttestations" },
  { text: "ENS", filter: "ensTextRecords" },
];

NetworkButtons.sort((a, b) => a.text.localeCompare(b.text));

const ExplorePage = ({
  registrationInstances,
  junosInstances,
  osmosisInstances,
  stargazeInstances,
  easAttestations,
  ENSTextRecords,
  sunriseInstances,
}) => {
  const [filterVal, setFilterVal] = useState("");
  const onChangeFilter = (e) => setFilterVal(e.target.value);
  const [networkFilter, setNetworkFilter] = useState("all");

  console.log("Sunrise Instances");
  console.log(sunriseInstances);

  // Network Filter for Juno, Stargaze and Osmosis
  const filteredRegistrations = (instances) => {
    return instances
      .flatMap((network) =>
        network.registrationNetwork.registrations.filter((reg) =>
          filterRegistrations(reg, filterVal)
        )
      )
      .map((registration, i) => (
        <RegistrationLeanCard key={i} {...registration} />
      ));
  };

  const renderCards = () => {
    switch (networkFilter) {
      case "juno":
        return filteredRegistrations(junosInstances);
      case "osmosis":
        return filteredRegistrations(osmosisInstances);
      case "stargaze":
        return filteredRegistrations(stargazeInstances);
      case "arbitrum-one":
        return sunriseInstances
          .map((registration, i) => (
            <RegistrationLeanCard key={i} {...registration} />
          ));
      case "chapel":
        return registrationInstances
          .filter((reg) => NetworkFilterRegistrations(reg, "chapel"))
          .map((registration, i) => (
            <RegistrationCard key={i} {...registration} />
          ));
      case "goerli":
        return registrationInstances
          .filter((reg) => NetworkFilterRegistrations(reg, "goerli"))
          .map((registration, i) => (
            <RegistrationCard key={i} {...registration} />
          ));
      case "gnosis":
        return registrationInstances
          .filter((reg) => NetworkFilterRegistrations(reg, "gnosis"))
          .map((registration, i) => (
            <RegistrationCard key={i} {...registration} />
          ));
      case "ethereum":
        return registrationInstances
          .filter((reg) => NetworkFilterRegistrations(reg, "ethereum"))
          .map((registration, i) => (
            <RegistrationCard key={i} {...registration} /> // Convert to lean card
          ));
      case "optimism":
        return registrationInstances
          .filter((reg) => NetworkFilterRegistrations(reg, "optimism"))
          .map((registration, i) => (
            <RegistrationCard key={i} {...registration} />
          ));
      case "optimism-goerli":
        return registrationInstances
          .filter((reg) => NetworkFilterRegistrations(reg, "optimism-goerli"))
          .map((registration, i) => (
            <RegistrationCard key={i} {...registration} />
          ));
      case "arbitrum-goerli":
        return registrationInstances
          .filter((reg) => NetworkFilterRegistrations(reg, "arbitrum-goerli"))
          .map((registration, i) => (
            <RegistrationCard key={i} {...registration} />
          ));
      case "easAttestations":
        return easAttestations
          .filter((attestation) => !filterEASbyId.includes(attestation.id)) // Filter out attestation by name
          .map((attestation, i) => (
            <AttestationCard key={i} {...attestation} />
          ));
      case "ensTextRecords":
        return ENSTextRecords.map((textRecord, i) => (
          <ENSCard key={i} {...textRecord} />
        ));
      default:
        return (
          <>
            <div className="dao-cards">{daoCards}</div>
            <br></br>
            <div className="dao-cards">{daodaoCards}</div>
            <br></br>
            <div className="dao-cards">{osmosisDaoCards}</div>
            <br></br>
            <div className="dao-cards">{stargazeDaoCards}</div>
          </>
        );
    }
  };

  // Handle EVM networks
  const daoCards = registrationInstances
    .filter((reg) => filterRegistrations(reg, filterVal))
    .map((registration, i) => {
      return <RegistrationCard key={i} {...registration} />;
    });

  // Handle Juno DAOs
  const daodaoCards = junosInstances
    .flatMap((network) =>
      network.registrationNetwork.registrations.filter((reg) =>
        filterRegistrations(reg, filterVal)
      )
    )
    .map((registration, i) => {
      return <RegistrationCard key={i} {...registration}      standalone={true}
      displayWithoutEdit={true} />;
    });

  // Handle Stargaze DAOs
  const stargazeDaoCards = stargazeInstances
    ?.flatMap((network) =>
      network.registrationNetwork.registrations.filter((reg) =>
        filterRegistrations(reg, filterVal)
      )
    )
    .map((registration, i) => {
      return <RegistrationCard key={i} {...registration}  standalone={true}
      displayWithoutEdit={true} />;
    });

  // Handle Osmosis DAOs
  const osmosisDaoCards = osmosisInstances
    ?.flatMap((network) =>
      network.registrationNetwork.registrations.filter((reg) =>
        filterRegistrations(reg, filterVal)
      )
    )
    .map((registration, i) => {
      return <RegistrationCard key={i} {...registration} standalone={true}
      displayWithoutEdit={true} />;
    });

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
