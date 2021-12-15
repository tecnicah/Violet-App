// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
//desarrollo

export const environment = {
  production: false,
  API_URL: 'https://my.premierds.com/api/api/',
  images_path: "https://my.premierds.com/api/",
  //API_URL: 'http://34.237.214.147/back/api_premier_qa/api/',
  //images_path: "http://34.237.214.147/back/api_premier_qa/",
  firebaseConfig : {
    apiKey: "AIzaSyAz2w9G_0zmFyKtZYLffohwT6F5n-ZL7Bc",
    authDomain: "premier-7ef49.firebaseapp.com",
    databaseURL: "https://premier-7ef49.firebaseio.com",
    projectId: "premier-7ef49",
    storageBucket: "premier-7ef49.appspot.com",
    messagingSenderId: "612782450080",
    appId: "1:612782450080:web:58e80f93b519d9ed8cb0c5",
    measurementId: "G-SPLPZQMW19"
  }
};

//produccion
/*
export const environment = {
  production: false,
  //API_URL: 'https://my.premierds.com/api/api/',
  //images_path: "https://my.premierds.com/api/",
  API_URL: 'http://34.237.214.147/back/api_premier/api/',
  images_path: "http://34.237.214.147/back/api_premier/",
  firebaseConfig : {
    apiKey: "AIzaSyAz2w9G_0zmFyKtZYLffohwT6F5n-ZL7Bc",
    authDomain: "premier-7ef49.firebaseapp.com",
    databaseURL: "https://premier-7ef49.firebaseio.com",
    projectId: "premier-7ef49",
    storageBucket: "premier-7ef49.appspot.com",
    messagingSenderId: "612782450080",
    appId: "1:612782450080:web:58e80f93b519d9ed8cb0c5",
    measurementId: "G-SPLPZQMW19"
  }
};
*/
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
