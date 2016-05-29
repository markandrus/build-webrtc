build-webrtc
============

This project packages [WebRTC](https://webrtc.org/native-code) libraries and
headers.

Install
-------

```
npm install --save build-webrtc-0.50.0-49f7bd3
```

**Binaries unavailable?** If binaries are unavailable for your particular
combination of platform and architecture, build-webrtc can fallback to building
from source. See [the build-webrtc documentation](docs/README.md) for more
information.

Usage
-----

Assuming install succeeds, you will have a lib directory containing WebRTC
libraries and an include directory containing WebRTC headers. If you want to
build a [Node Addon](https://nodejs.org/api/addons.html) or some other project
that depends on WebRTC, set your linker and compiler flags accordingly.

Versioning
----------

WebRTC doesn't follow [SemVer](http://semver.org), and I'm not sure they have
any API guarantees, even within branch heads. As such, this project only
produces pre-releases of the form

```
0.$MAJOR.$PATCH-$COMMIT
```

Where `$MAJOR` is the WebRTC branch head, and `$COMMIT` is a particular commit
within said branch head. For the most part, `$PATCH` should remain zero.

**You must rely on a specific pre-release version of build-webrtc in your
project.**
