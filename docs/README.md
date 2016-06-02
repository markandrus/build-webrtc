Documentation
=============

build-webrtc is a wrapper around WebRTC's build scripts that aims to make
downloading and getting started with WebRTC simple, especially for Node Addons.
Since building WebRTC from source is quite cumbersome, build-webrtc includes
features to download (and upload) pre-compiled binaries, along with the header
files. Ideally anyone using this project can rely on binaries alone.

Alas, if you are reading this far, you probably need to build from source or
better understand this tool. If so, read on!

**Warning:** If you have trouble building WebRTC with build-webrtc, ensure you
can build WebRTC normally by following [WebRTC's own build instructions](https://webrtc.org/native-code/development/)
before opening an issue.

Commands
--------

build-webrtc is structured around [Jake](http://jakejs.com). You don't need
jake installed or on your path to call these commands; they are all
accessible via `npm run`. There are also dependencies between the commands
(not described here), so calling one command may trigger its pre-requisites if
they have not yet been satisfied.

Many commands can also be configured by setting environment variables and/or
configuring a config.json file. Refer to each command and the sample
[config.default.json](../config.default.json) for more information.

### build-webrtc

```
npm run build-webrtc
   jake build-webrtc
```

This command will build WebRTC.

**Need to customize the build?** Any environment variables you can set during
a normal build of WebRTC can be set before running this command; for example,
`GYP_DEFINES`, `GYP_MSVS_VERSION`, etc.

### checkout-depot_tools

```
npm run checkout-depot_tools
   jake checkout-depot_tools
```

This command will checkout [depot_tools](http://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools.html).

**Already have depot_tools?** Set the environment variable
`DEPOT_TOOLS_CHECKOUT` or the config.json variable `depot_tools.checkout` to
your depot_tools checkout. This will short-circuit the command.

### checkout-webrtc

```
npm run checkout-webrtc
   jake checkout-webrtc
```

This command will checkout WebRTC.

**Already have WebRTC?** Set the environment variable `WEBRTC_CHECKOUT` or the
config.json variable `webrtc.checkout` to your WebRTC checkout. This will
short-circuit the initial `gclient sync`.

**Want to check out a different git ref?** Set the environment variable
`WEBRTC_REF` or the config.json variable `webrtc.ref` to your desired git
ref.

### copy-webrtc-headers

```
npm run copy-webrtc-headers
   jake copy-webrtc-headers
```

This command will copy WebRTC headers from your WebRTC checkout into the
include directory.

### copy-webrtc-libs

```
npm run copy-webrtc-libs
   jake copy-webrtc-libs
```

This command will copy libraries into the lib directory.

### download-webrtc

```
npm run download-webrtc
   jake download-webrtc
```

This command will download previously-published libraries and headers.

### lint

```
npm run lint
   jake lint
```

This command will lint the build scripts (useful if you are developing
build-webrtc).

### package-webrtc

```
npm run package-webrtc
   jake package-webrtc
```

This command will package libraries and headers into a gzipped tarball.

### publish-webrtc

```
npm run publish-webrtc
   jake publish-webrtc
```

This command will publish the gzipped tarball. You need to specify environment
variables `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `BUCKET`, or set
the config.json variables `aws.accessKeyId`, `aws.secretAccessKey`, and
`aws.bucket`.

### show-webrtc-branch-head

```
npm run show-webrtc-branch-head
   jake show-webrtc-branch-head
```

This command will show the branch head (if any) of the current WebRTC checkout.

### show-webrtc-commit

```
npm run show-webrtc-commit
   jake show-webrtc-commit
```

This command will show the commit of the current WebRTC checkout.

### show-webrtc-tar.gz-name

```
npm run show-webrtc-tar.gz-name
   jake show-webrtc-tar.gz-name
```

This command will show the name of the gzipped tarball that package-webrtc
will produce.
