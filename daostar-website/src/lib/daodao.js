const apiUrl = "https://search.daodao.zone/indexes/daos/documents?limit=10000";
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer'+ process.env.BEARER_TOKEN
};

// Define a function to fetch and structure the data
export default async function fetchData() {
  try {
    const response = await fetch(apiUrl, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    const structuredData = data.results.map(item => ({
      contractAddress: item.contractAddress,
    //   codeId: item.codeId,
    //   blockHeight: item.block.height,
    //   blockTime: new Date(Number(item.block.timeUnixMs)),
    //   admin: item.value.admin,
    //   config: item.value.config,
      name: item.value.config.name,
      daoURI: item.value.config.dao_uri,
      description: item.value.config.description,
    //   version: item.value.version,
    //   proposalModules: item.value.proposal_modules,
      id: item.value.voting_module,
    //   activeProposalModuleCount: item.value.active_proposal_module_count,
    //   totalProposalModuleCount: item.value.total_proposal_module_count,
    //   votingModuleInfo: item.value.votingModuleInfo,
      createdAt: new Date(item.value.createdAt),
    //   adminInfo: item.value.adminInfo,
    //   proposalCount: item.value.proposalCount,
    //   polytoneProxies: item.value.polytoneProxies,
    network,
    onClickEdit,
    contractAddress,
    managerAddress,
    daoURI,
    description,
    standalone,
    membersURI,
    activityLogURI,
    issuersURI,
    proposalsURI,
    governanceURI,
    }));

    return structuredData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

// Call the fetchData function
fetchData().then(data => {
  if (data) {
    // Use the structured data here
    console.log(data);
  }
});
