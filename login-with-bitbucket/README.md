Login with Bitbucket
=================
**Node** implementation for Bitbucket login.

### Need more information? 
Follow <a href="https://confluence.atlassian.com/display/BITBUCKET/oauth+Endpoint#oauthEndpoint-POSTanewrequesttoken" target="_blank">Bitbucket API</a>.

## Introduction
"You can write an application that integrates with the Bitbucket service through our REST API.  Through your application, Bitbucket users sign in to their account and grant your application permissions to make calls on their behalf.  An IDE, for example, could sync a Bitbucket repository in response to local changes, or an iPhone app could provide a custom UI for managing issues tracked on Bitbucket." (from <a href="" target="_blank">Bitbucket API</a>)

## Creating an Bitbucket APP
"Bitbucket grants your application authorized access using the OAuth 1.0a with HMAC-SHA1 (shared secret) signatures. We support both 3-Legged and 2-Legged OAuth. RSA-SHA1 (the public/private keys feature) is not currently supported.  You should use an existing OAuth library for your application instead of implementing the protocol yourself.  Numerous reusable libraries in many languages exist for use with OAuth – they can be found on the official oauth.net 'code' section."

#### Obtaining an OAuth Consumer

OAuth needs a consumer key and secret.  You can create your own consumer key and secret by do the following:

 1. Log into your Bitbucket account.
 2. Click **accountname > Account** from the menu bar.
 
 The **Account settings** page appears.

 3. Click **Integrated applications** from the menu bar.
 4. Click the **Add consumer** button.  
 
 The system requests the following information:

 <table class="confluenceTable tablesorter">
   <thead>
     <tr class="sortableHeader">
       <th class="confluenceTh sortableHeader" data-column="0">
         <div class="tablesorter-header-inner">Field</div>
       </th>
       <th class="confluenceTh sortableHeader" data-column="1">
         <div class="tablesorter-header-inner">Description</div>
       </th>
     </tr>
   </thead>
   <tbody>
     <tr>
       <td class="confluenceTd">Name</td>
       <td class="confluenceTd">The display name for your consumer. This must be unique within your account. This is required.</td>
     </tr>
     <tr>
       <td class="confluenceTd">Description</td>
       <td class="confluenceTd">An optional description of what your consumer does.</td>
     </tr>
     <tr>
       <td class="confluenceTd">&nbsp;</td>
       <td class="confluenceTd">An optional URL where the curious can go to learn more about your cool application.</td>
     </tr>
   </tbody>
 </table>

 5. Press **Add consumer**. 

 The system generates a key and a secret for you.
 
 6. Toggle the consumer name to see the generated Key and Secret value for your consumer.


## Instalation

 1. Clone this repository.

 ```
 git clone https://github.com/IonicaBizau/login-with-bitbucket.git
 ```

 2. Install node modules.

 ```
 npm install
 ```

 3. Be sure that you modified the `secrets.js` file from `bitbucket` directory.

## Starting

```
node server.js
```

## Testing

Open the localhost in browser with port that is printed in `console`.
