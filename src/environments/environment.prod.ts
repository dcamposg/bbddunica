export const environment = {
  production: true,
  adalConfig: {
    tenant: 'ONISIS.onmicrosoft.com',                   // <-- ADD
    clientId: '822a064b-e07d-4176-9588-0565e3ef2e8c',    // <-- ADD
    postLogoutRedirectUri: 'http://212.36.69.111:99',
    endpoints: {
      'https://graph.windows.net/': 'https://graph.windows.net/',
    },
  },
  apiUrl: 'https://graph.windows.net/ONISIS.onmicrosoft.com/'
};
