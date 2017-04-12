# find-facebook-id

[![npm version](https://badge.fury.io/js/find-facebook-id.svg)](https://badge.fury.io/js/find-facebook-id)
[![CircleCI](https://circleci.com/gh/pradel/find-facebook-id.svg?style=svg)](https://circleci.com/gh/pradel/find-facebook-id)

Find a facebook id given an url.

### Install
```
yarn add find-facebook-id
npm i --save find-facebook-id
```

# Usage
```javascript
import findFacebookId from 'find-facebook-id';

// Find facebook id return a promise

const id = await findFacebookId('zuck');

findFacebookId('zuck').then((id) => {
  console.log(`facebook id for zuck is: ${id}`);
}).catch((err) {
  console.log(err);
});
```
