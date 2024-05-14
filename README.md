<p align="center">
  <a href="https://lysand.org"><img src="https://cdn.lysand.org/logo-long-dark.webp" alt="Lysand Logo" height="110"></a>
</p>

<center><h1>Lysand API</h1></center>

Set of NPM packages written in TypeScript to interact with Lysand-compatible services.

## Packages

- **`@lysand-org/federation`**: Federation types, validators and cryptography for Lysand server implementations.
- **`@lysand-org/client`**: Client for the reference Lysand Server implementation.

## Efficiency

The built output of each package is not even `200 KB` in size, making it a lightweight and efficient solution for your Lysand needs. Installing the package adds around `5 MB` to your `node_modules` folder, but this does not affect the final bundle size.

Compilation (bundling/minifying) time is a few seconds, almost all of which is spent on type-checking. The actual compilation time is less than a tenth of a second.

## Usage

### Federation

Please see the [**`@lysand-org/federation` README**](federation/README.md) for more information.

### Client

#### Roadmap

- [ ] Parity with [**megalodon**](https://github.com/h3poteto/megalodon)'s Mastodon client
- [ ] Lysand-specific features

> [!WARNING]
> Not yet published or started work on.

## Getting Started

### Prerequisites

#### For Usage

See the [**Compatibility**](#compatibility) section for the supported environments. Any package manager can be used to install the packages.

#### For Development

- [**Bun**](https://bun.sh) version `1.1.8` or higher.
- Either the [**Linux**](https://www.linux.org) or [**macOS**](https://www.apple.com/macos) operating systems. ([**Windows**](https://www.microsoft.com/windows) will work, but is not officially supported.)

### Compatibility

This library is built for JavaScript runtimes with the support for:

- [**ES Modules**](https://nodejs.org/api/esm.html)
- [**ECMAScript 2020**](https://www.ecma-international.org/ecma-262/11.0/index.html)

#### Runtimes

- **Node.js**: 14.0+ is the minimum, but only Node.js 20.0+ (LTS) is officially supported.
- **Deno**: Support is unknown. 1.0+ is expected to work.
- **Bun**: Bun 1.1.8 is the minimum-supported version. As Bun is rapidly evolving, this may change. Previous versions may also work.

#### Browsers

Consequently, this library is compatible without any bundling in the following browser versions:

- **Chrome**: 80+
- **Edge**: 80+
- **Firefox**: 74+
- **Safari**: 13.1+
- **Opera**: 67+
- **Internet Explorer**: None

If you are targeting older browsers, please don't, you are doing yourself a disservice.

Transpilation to non-ES Module environments is not officially supported, but should be simple with the use of a bundler like [**Parcel**](https://parceljs.org) or [**Rollup**](https://rollupjs.org).

### Installation

Both packages are distributed as a scoped package on the NPM registry.

```bash
npm install @lysand-org/federation @lysand-org/client # For NPM
yarn add @lysand-org/federation @lysand-org/client # For Yarn
pnpm add @lysand-org/federation @lysand-org/client # For PNPM
bun add @lysand-org/federation @lysand-org/client # For Bun
```

#### From Source

If you want to install from source, you can clone this repository and run the following commands:

```bash
bun install # Install dependencies

bun run build # Build the packages
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

### Projects

- [**Bun**](https://bun.sh): Thanks to the Bun team for creating an amazing JavaScript runtime.
- [**TypeScript**](https://www.typescriptlang.org): TypeScript is the backbone of this project.
- [**Node.js**](https://nodejs.org): Node.js created the idea of JavaScript on the server.

### People

- [**April John**](https://github.com/cutestnekoaqua): Creator and maintainer of the Lysand Server ActivityPub bridge.