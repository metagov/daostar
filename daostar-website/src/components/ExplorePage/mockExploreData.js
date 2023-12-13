// export const mockExploreData = [
//   {
//     registrationNetwork: { id: "gnosis" },
//     registrations: {
//       "@context": "<http://www.daostar.org/schemas>",
//       id: "1111",
//       type: "DAO",
//       daoName: "SampleDAO",
//       description: "The community of core contributors to DAOhaus",
//       membersURI: "https://sample.dao/members.json",
//       proposalsURI: "https://sample.dao/proposals.json",
//       activityLogURI: "https://sample.dao/activityLog.json",
//       governanceURI: "https://sample.dao/governance.md",
//       issuersURI: "https://sample.dao/issuer.md",
//       daoURI:
//         "https://api.daostar.org/immutable/QmRj4AasAEWg45vBmNzAJ5MLVnVUDEZqdbF9yTKhgsswcK",
//     },
//   },
// ];

// mockExploreData.js

export const mockExploreData = [
  {
    registrationNetwork: {
      __typename: "RegistrationNetwork",
      id: "junos",
      registrations: [
        {
          __typename: "RegistrationInstance",
          id: "0x177cc7d1658f240165fe1ded0f6731ca0c98ed08",
          daoName: "Mock DAO 1",
          daoAddress: "0x177cc7d1658f240165fe1ded0f6731ca0c98ed08",
          daoDescription: null,
          daoURI: "ipfs://QmadFQwRRXKZAyi9Fn7qf1ut7YNrsKMJ6P2ENmCie5yQG5",
          governanceURI: "https://daostar.org/",
          issuersURI: null,
          managerAddress: null,
          membersURI:
            "https://services.daostar.org/api/v1/gnosis/members/1/0x177CC7d1658F240165fe1dEd0F6731ca0c98ed08",
          proposalsURI:
            "https://services.daostar.org/api/v1/gnosis/proposals/1/0x177CC7d1658F240165fe1dEd0F6731ca0c98ed08",
          registrationAddress: "0x96bc307cf2b692ab05155f979d13d294aaa9562b",
          registrationNetwork: {
            __typename: "RegistrationNetwork",
            id: "junos",
          },
        },
        {
          __typename: "RegistrationInstance",
          id: "0x177cc7d1658f240165fe1ded0f6731ca0c98ed08",
          daoName: "Mock DAO 2",
          daoAddress: "0x177cc7d1658f240165fe1ded0f6731ca0c98ed08",
          daoDescription: null,
          daoURI: "ipfs://QmadFQwRRXKZAyi9Fn7qf1ut7YNrsKMJ6P2ENmCie5yQG5",
          governanceURI: "https://daostar.org/",
          issuersURI: null,
          managerAddress: null,
          membersURI:
            "https://services.daostar.org/api/v1/gnosis/members/1/0x177CC7d1658F240165fe1dEd0F6731ca0c98ed08",
          proposalsURI:
            "https://services.daostar.org/api/v1/gnosis/proposals/1/0x177CC7d1658F240165fe1dEd0F6731ca0c98ed08",
          registrationAddress: "0x96bc307cf2b692ab05155f979d13d294aaa9562b",
          registrationNetwork: {
            __typename: "RegistrationNetwork",
            id: "junos",
          },
        },
      ],
    },
  },
];
