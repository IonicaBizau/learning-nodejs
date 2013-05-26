Login with Github
=================
**Node** implementation for Github login.

### Need more information? 
Follow <a href="http://developer.github.com/v3/oauth/" target="_blank">Github API</a>.

## Introduction
"OAuth2 is a protocol that lets external apps request authorization to private details in a user’s GitHub account without getting their password. This is preferred over Basic Authentication because tokens can be limited to specific types of data, and can be revoked by users at any time." (from Github API)

### Creating an Github APP
All developers need to register their application before getting started. A registered OAuth application is assigned a unique Client ID and Client Secret. The Client Secret should not be shared.

Click <a href="https://github.com/settings/applications/new" target="_blank">here</a> for this.
You will receive a CLIENT_ID and a SECRET_KEY.

Replace them into `server.js` file and in `public/index.html` file.

## Installation

1. Clone this repository.

```
git clone https://github.com/IonicaBizau/login-with-github.git
```

2. Install node modules.

```
npm install
```

## Starting

```
node server.js
```

or

```
node server.js --showLogs
```
The second one will print the console messages.


## Testing

Open <a href="http://localhost:8000/" target="_blank">http://localhost:8000/</a> and click the button to Sign In with Github account.
You will can accept or deny the access to app.
