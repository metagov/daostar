import React, { useEffect, useState } from "react";
import RegistrationLeanCard from "../RegistrationCard/RegistrationLeanCard";
import AttestationCard from "../AttestationCard/AttestationCard";
import ENSCard from "../ENSCard/ENSCard";
import "./ExplorePage.css";
import { InputGroup, Button } from "@blueprintjs/core";
import { filterEASbyAttester, filterEASbyId } from "../FilterRegistrations/Filter_Registrations_By_Id";
import RegistrationCard from "../RegistrationCard/RegistrationCard";

// Preliminary check filter, if a DAO has no name or matches excluded addresses or words
export const filterRegistrations = (registration, filterVal = "") => {
  const daoNameLower = registration.daoName?.toLowerCase() || "";
  const excludedWords = ["scam", "test", "fuck"];
  const excludedAddress = "0xdeb9e5915db81011c549799a9ea37ede4d72efba";

  // Return false early if conditions are not met
  if (!daoNameLower || registration.daoAddress?.toLowerCase() === excludedAddress) {
    return false;
  }

  // Check if daoName contains excluded words or does not match filter
  if (excludedWords.some((word) => daoNameLower.includes(word))) {
    return false;
  }

  // Perform filtering if a filterVal is provided
  return filterVal === "" || daoNameLower.includes(filterVal.toLowerCase());
};

export const NetworkFilterRegistrations = (registration, filterVal = "") => {
  const excludedAddress = "0xdeb9e5915db81011c549799a9ea37ede4d72efba";

  if (registration.registrationNetwork.id === filterVal) return true;

  if (registration.registrationNetwork.daoAddress === excludedAddress) return false;

  if (filterVal === "ethereum" && 
      ["ethereum", "mainnet"].includes(registration.registrationNetwork.id)) {
    return true;
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
  sunriseNetworkInstances
}) => {
  const [filterVal, setFilterVal] = useState("");
  const onChangeFilter = (e) => setFilterVal(e.target.value);
  const [networkFilter, setNetworkFilter] = useState("all");

  const isValidDaoURI = (daoURI) => {
    return (
      (daoURI.startsWith("ipfs://") && daoURI.length >= 53) ||
      (daoURI.startsWith("https://ipfs.io/ipfs/") && daoURI.length >= 67)
    );
  };

  const filteredRegistrations = (instances) => {
    return instances
      .flatMap((network) =>
        network.registrationNetwork.registrations.filter((reg) =>
          filterRegistrations(reg, filterVal)
        )
      )
      .map((registration, i) => (
        <RegistrationCard key={i} {...registration} displayWithoutEdit={true} standalone={true} />
      ));
  };

  const filteredRegistrationsSunrise = (sunriseInstances, networkFilterValue = "") => {
    return sunriseInstances
      .filter((registration) => {
        const daoAddressLower = registration.daoAddress.toLowerCase();
        const excludedAddress = "0xdeb9e5915db81011c549799a9ea37ede4d72efba";

        if (daoAddressLower === excludedAddress || !isValidDaoURI(registration.daoURI)) {
          return false;
        }

        return registration.registrationNetwork.id === networkFilterValue;
      })
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
        return filteredRegistrationsSunrise(sunriseNetworkInstances, "arbitrum-one");
      case "chapel":
        return filteredRegistrationsSunrise(sunriseNetworkInstances, "chapel");
      case "gnosis":
        return filteredRegistrationsSunrise(sunriseNetworkInstances, "gnosis");
      case "ethereum":
        return filteredRegistrationsSunrise(sunriseNetworkInstances, "mainnet");
      case "optimism":
        return registrationInstances
          .filter(
            (reg) =>
              NetworkFilterRegistrations(reg, "optimism") &&
              reg.daoAddress !== "0xdeb9e5915db81011c549799a9ea37ede4d72efba"
          )
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
          .filter(
            (attestation) =>
              !filterEASbyAttester.includes(attestation.attester) &&
              !filterEASbyId.includes(attestation.id)
          )
          .map((attestation, i) => (
            <AttestationCard key={i} {...attestation} />
          ));
      case "ensTextRecords":
        return ENSTextRecords.map((textRecord, i) => (
          <ENSCard key={i} {...textRecord} />
        ));
      default:
        return (
          <div className="dao-cards-all">
            {daoCards}
          </div>
        );
    }
  };

  const daoCards = registrationInstances
    .filter((reg) => filterRegistrations(reg, filterVal))
    .map((registration, i) => {
      return <RegistrationCard key={i} {...registration} />;
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
              className={networkFilter === button.filter ? "button-highlighted" : ""}
            />
          ))}
        </div>
      </div>

      <div className={networkFilter === "all" ? "dao-cards-all" : "dao-cards"}>
        {renderCards()}
      </div>
    </div>
  );
};

export default ExplorePage;
