/* 
*  Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. 
*  See LICENSE in the source repository root for complete license information. 
*/

// This sample uses an open source OAuth 2.0 library that is compatible with the Azure AD v2.0 endpoint. 
// Microsoft does not provide fixes or direct support for this library. 
// Refer to the library’s repository to file issues or for other support. 
// For more information about auth libraries see: https://azure.microsoft.com/documentation/articles/active-directory-v2-libraries/ 
// Library repo: https://github.com/MrSwitch/hello.js

import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import * as hello from 'hellojs/dist/hello.all.js';

import { Configs } from '../providers/configs';

@Injectable()
export class AuthService {
  constructor(
    private zone: NgZone,
    private router: Router
  ) { }

  initAuth() {
    hello.init({
        msft: {
          id: '33ba67a4-5163-4eba-b193-325b549b1b66',
          oauth: {
            version: 2,
            auth: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize'
          },
          scope_delim: ' ',
          form: false
        },
      },
      { redirect_uri: window.location.href }
    );
  }

  login() {
    hello.init({
      msft: {
        id: '33ba67a4-5163-4eba-b193-325b549b1b66',
        oauth: {
          version: 2,
          auth: 'https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize'
        },
        scope_delim: ' ',
        form: false
      },
    },
      { redirect_uri: window.location.href }
    );
    hello('msft').login({ scope: 'User.Read Mail.Send' }).then(
      () => {
        this.zone.run(() => {
          this.router.navigate(['/home']);
        });
      },
      e => console.log(e.error.message)
    );
  }

  logout() {
    hello('msft').logout().then(
      () => window.location.href = '/',
      e => console.log(e.error.message)
    );
  }
}
