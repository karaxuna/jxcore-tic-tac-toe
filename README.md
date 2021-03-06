# jxcore-tic-tac-toe
[JXcore cordova](https://github.com/jxcore/jxcore-cordova) application that hosts [tic-tac-toe game](https://github.com/karaxuna/kanvas-tic-tac-toe). Game can be played from application and from browser clients connected to it. Just navigate from browser to url that is displayed in the application and you are connected.

![Android](https://raw.githubusercontent.com/karaxuna/jxcore-tic-tac-toe/master/screens/android.png "Android")
![Browser](https://raw.githubusercontent.com/karaxuna/jxcore-tic-tac-toe/master/screens/browser.png "Browser")

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

Navigate to project root and install local dependencies:

```bash
cd jxcore-tic-tac-toe
jx install
```

Add cordova platforms:

```bash
cordova platforms add android
cordova platforms add ios
```

[Download](https://github.com/jxcore/jxcore-cordova-release/raw/master/0.0.4/io.jxcore.node.jx) `io.jxcore.node` cordova plugin in the root of project, extract it with jxcore and then add it:

```bash
jx io.jxcore.node.jx
cordova plugins add io.jxcore.node
```

Run application:

```bash
gulp android
```
  
This command automatically installs bower packages and node packages for jxcore, builds ngpack and runs cordova on android platform. That's it! Since **JXcore is cross platform**, you can also run development server (`localhost:8001`) on computer and it will work just like application:

```bash
gulp start
```

It watches for changes in files and performs all necessary steps to rebuild project.
