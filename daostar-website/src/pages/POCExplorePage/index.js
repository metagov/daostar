import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import {
  Button,
  Card,
  Checkbox,
  InputGroup,
  NonIdealState,
} from "@blueprintjs/core";
import DaoRecordCard from "./DaoRecordCard";
import "./ExplorePage.css";

const listDAOSQuery = /* GraphQL */ `
  query listDAOS(
    $filter: ModelDAOFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDAOS(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        searchField
        name
        treasuryAddresses {
          address
          description
        }
        tokenAddresses {
          address
          description
        }
        factories
        fora
        formationDate
        reviewDate
        status
        type
        amlStatus
        legalRepresentative {
          name
          contact
        }
        registrations
        presence
        exclusions
        wrappers {
          name
          jurisdiction
          regulator
          functions
        }
        contact {
          name
          email
          phone
          company
          role
        }
        createdAt
        updatedAt
      }
    }
  }
`;

const POCExplorePage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const [amlOnly, setAmlOnly] = useState(false);
  const [daos, setDaos] = useState([]);

  useEffect(() => {
    (async () => {
      const searchFilters = {
        searchField: { contains: filter.toLocaleLowerCase() },
      };

      if (amlOnly) {
        searchFilters.amlStatus = { eq: true };
      }

      try {
        const todos = await API.graphql(
          graphqlOperation(listDAOSQuery, {
            filter: searchFilters,
          })
        );
        const daos = todos.data.listDAOS.items;
        setDaos(daos);
      } catch (err) {
        console.log("error fetching todos", err);
      }
    })();
  }, [filter, amlOnly]);

  return (
    <div className="explore-page">
      <h1>Explore DAOs</h1>

      <Button
        intent="primary"
        text="Register a DAO"
        onClick={() => navigate("/test/register")}
        style={{ marginBottom: "20px" }}
      />

      <div className="filter">
        <InputGroup
          large
          placeholder="Filter DAOs..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Checkbox
          style={{ fontSize: "1rem", marginTop: 20 }}
          checked={amlOnly}
          label="Show AML/CTF Certified DAOs only"
          onChange={() => setAmlOnly(!amlOnly)}
        />
      </div>
      <h5>
        {daos.length} record{daos.length === 1 ? "" : "s"} found
      </h5>
      {daos.length === 0 ? (
        <Card className="wizard-card">
          <NonIdealState
            icon={"search"}
            title="No search results"
            description="Try filtering with a different name"
          />
        </Card>
      ) : (
        <div className="dao-cards">
          {daos.map((dao) => {
            return (
              <Card key={dao.id} className="wizard-card registration-card">
                <DaoRecordCard name={dao.name} data={dao} />
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default POCExplorePage;
