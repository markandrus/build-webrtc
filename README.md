build-webrtc
============

This project builds WebRTC, archives the binaries along with the headers, and
then (eventually) uploads them to NPM, GitHub, and/or S3.

Install
-------

```
npm install
```

Usage
-----

This project takes care of downloading [depot_tools](https://chromium.googlesource.com/chromium/tools/depot_tools.git) and [WebRTC](https://webrtc.org), but you'll need to ensure you have [the prerequisite software to build WebRTC](https://webrtc.org/native-code/development/prerequisite-sw). Then, run

```
npm start
```

If everything works, you'll have an archive of WebRTC binaries in the `out`
directory.

### Customize the Build

Already have [depot_tools](https://chromium.googlesource.com/chromium/tools/depot_tools.git)
or a WebRTC checkout? You can skip fetching these dependencies by setting the
`DEPOT_TOOLS` and/or `WEBRTC` environment variables, or you can create your
own `config.json` by copying the existing
[`config.default.json`](config.default.json).

For a full list of variables, see below.

| Environment Variable | `config.json` Variable | Description               |
|:-------------------- |:---------------------- |:------------------------- |
| `DEPOT_TOOLS`        | `depot_tools.path`     | The depot_tools directory |
| `DEPOT_TOOLS_REPO`   | `depot_tools.repo`     | The depot_tools repo      |
| `WEBRTC`             | `webrtc.path`          | The WebRTC directory      |
| `WEBRTC_GIT_REF`     | `webrtc.path`          | The WebRTC git ref        |
| `WEBRTC_REPO`        | `webrtc.repo`          | The WebRTC repo           |
| `OUT`                | `out`                  | The output directory      |
