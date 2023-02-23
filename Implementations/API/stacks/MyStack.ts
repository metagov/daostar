import { Api, StackContext } from '@serverless-stack/resources'

export function MyStack({ stack }: StackContext) {
    // Create the HTTP API
    const api = new Api(stack, 'Api', {
        routes: {
            'GET /molochv2/members/{network}/{id}': 'functions/molochv2/getMembers.handler',
            'GET /molochv2/proposals/{network}/{id}': 'functions/molochv2/getProposals.handler',
            // 'GET /molochv2/activities/{network}/{id}': 'functions/molochv2/getActivityLogs.handler',

            'GET /molochv3/members/{network}/{id}': 'functions/molochv3/getMembers.handler',
            'GET /molochv3/proposals/{network}/{id}': 'functions/molochv3/getProposals.handler',
            'GET /molochv3/activities/{network}/{id}': 'functions/molochv3/getActivityLogs.handler',

            'GET /daostack/proposals/{network}/{id}': 'functions/daostack/getProposals.handler',
            'GET /daostack/members/{network}/{id}': 'functions/daostack/getMembers.handler',

            'GET /aave/proposals/{network}/{id}': 'functions/aave/getProposals.handler',

            'GET /gnosis/members/{network}/{id}': 'functions/gnosis/getMembers.handler',
            'GET /gnosis/proposals/{network}/{id}': 'functions/gnosis/getProposals.handler',
            'GET /gnosis/activities/{network}/{id}': 'functions/gnosis/getActivityLogs.handler',

            'GET /gitcoin/members/{network}/{id}': 'functions/gitcoin/getMembers.handler',
            'GET /gitcoin/proposals/{network}/{id}': 'functions/gitcoin/getProposals.handler',
            'GET /gitcoin/activities/{network}/{id}': 'functions/gitcoin/getActivityLogs.handler',
        },
        customDomain: {
            domainName: 'services.daostar.org',
            hostedZone: 'services.daostar.org',
            path: 'api/v1',
        },
    })

    // Show the API endpoint in the output
    stack.addOutputs({
        ApiEndpoint: api.url,
    })
}
