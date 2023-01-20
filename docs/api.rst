DAOstar: API Documentation
==========================

To try out our API, you can interact with it via our front facing user interface hosted at `daostar.org/api <https://daostar.org/api>`_.

For developers interested in using the API directly, you've come to the right place!

The DAOstar API service is hosted at `api.daostar.org <https://api.daostar.org>`_ and you can `view our Swagger documentation here <https://daostar.org/api/docs>`_.

Basic Example
-------------

Our API service allows developers to submit EIP-4824 compatible DAO JSON-LD schemas to be stored on both IPFS and our database to easily propogate and serve the data. 

To create a new immutable DAO schema, simply send a POST request to ``https://api.daostar.org/immutable``. The request body should be a JSON object with the following format:
::

  {
    "data": {
      "name": "<DAO name>",
      "description": "<DAO description>",
      "membersURI": "<DAO members URI>",
      "proposalsURI": "<DAO proposals URI>",
      "activityLogURI": "<DAO activity log URI>",
      "governanceURI": "<DAO members URI>"
    }
  }

This API call will return a JSON object with the following format:
::

  {
    "url": "https://api.daostar.org/immutable/<CID>",
    "cid": "<CID>"
  }

The returned URL is a static endpoint that will serve the JSON schema that was just posted through our API service via a GET request. Additionally, the returned CID (content identifier) allows the schema to be accessed directly from the IPFS network without going through our API service.