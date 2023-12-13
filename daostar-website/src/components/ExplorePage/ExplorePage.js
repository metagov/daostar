import React, { useEffect, useState } from "react";
import RegistrationCard from "../RegistrationCard/RegistrationCard";
import "./ExplorePage.css";
import { InputGroup } from "@blueprintjs/core";

export const filterRegistrations = (registration, filterVal = "") => {
  if (!registration.daoName) {
    return false;
  }
  if (filterVal !== "") {
    return registration.daoName.toLowerCase().includes(filterVal.toLowerCase());
  }
  return true;
};

const ExplorePage = ({ registrationInstances, junosInstances, osmosisInstances }) => {
  const [filterVal, setFilterVal] = useState("");
  const onChangeFilter = (e) => setFilterVal(e.target.value);

 
  //when evm networks
  const daoCards = registrationInstances
    .filter((reg) => filterRegistrations(reg, filterVal))
    .map((registration, i) => {
      return <RegistrationCard key={i} {...registration} />;
    });

  // Handle when junos
    const daodaoCards = junosInstances
  .flatMap((network) =>
    network.registrationNetwork.registrations.filter((reg) =>
      filterRegistrations(reg, filterVal)
    )
  )
  .map((registration, i) => {
    return <RegistrationCard key={i} {...registration} standalone={true} displayWithoutEdit={true} />;
  });

    // Handle when stargaze
  //   const stargazeDaoCards = stargazeInstances?.flatMap((network) =>
  //   network.registrationNetwork.registrations.filter((reg) =>
  //     filterRegistrations(reg, filterVal)
  //   )
  // )
  // .map((registration, i) => {
  //   return <RegistrationCard key={i} {...registration} standalone={true} displayWithoutEdit={true} />;
  // });

    // Handle when osmosis
    const osmosisDaoCards = osmosisInstances?.flatMap((network) =>
    network.registrationNetwork.registrations.filter((reg) =>
      filterRegistrations(reg, filterVal)
    )
  )
  .map((registration, i) => {
    return <RegistrationCard key={i} {...registration} standalone={true} displayWithoutEdit={true} />;
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
      </div>
      <div className="dao-cards">{daoCards}</div>
      <br></br>
      <div className="dao-cards">{daodaoCards}</div>
      <br></br>
      <div className="dao-cards">{stargazeDaoCards}</div>
      <br></br>
      <div className="dao-cards">{osmosisDaoCards}</div>
    </div>
  );
};

export default ExplorePage;
