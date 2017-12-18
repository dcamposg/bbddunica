// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  adalConfig: {
    tenant: 'ONISIS.onmicrosoft.com',                   // <-- ADD
    clientId: '8fc7974e-56d1-4198-b057-d4d774372074',    // <-- ADD
    postLogoutRedirectUri: 'http://localhost:4200',
    endpoints: {
      'https://graph.windows.net/': 'https://graph.windows.net/',
    },
  },
  apiUrl: 'https://graph.windows.net/ONISIS.onmicrosoft.com/'
};
