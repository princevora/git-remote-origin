# git-username
Get git User Repo's Remote origin using node - js With git commands

# Commands
```
npm i 
```

or 

```
npm install 
```

# Usage
```js
import remoteOrigin from "./main.js";

try {
    const username = await remoteOrigin();
} catch (error) {
    console.error(error);
}
```
