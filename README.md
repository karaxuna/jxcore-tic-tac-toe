# jxcore-tic-tac-toe
[JXcore cordova](https://github.com/jxcore/jxcore-cordova) application that hosts tic-tac-toe game. Game can be played from application and from browser clients connected to it. Just navigate from browser to url that is displayed in the application and you are connected.

## Installation steps:

Clone repository:

```bash
git clone https://github.com/karaxuna/jxcore-tic-tac-toe.git
```

[Download and install JXcore](http://jxcore.com/downloads/). Then install necessary global node modules:

```bash
jx install cordova -g
jx install bower -g
jx install gulp -g
jx install ngpack -g
```

**Fix `ngpack` bug if you are *nix user:**

```bash
sudo apt-get install dos2unix
cd /usr/local/lib/node_modules/ngpack && sudo dos2unix ./**/*
```
