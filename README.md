<p align="center">
  <a href="https://versia.pub"><img src="https://cdn.versia.pub/branding/versia-dark.webp" alt="Versia Logo" height="110"></a>
</p>

<center><h1>Versia API</h1></center>

Set of NPM packages written in TypeScript to interact with Versia-compatible services.

## Packages

- **`@versia/federation`**: Federation types, validators and cryptography for Versia server implementations.
- **`@versia/client`**: Client for the reference Versia Server implementation.

## Efficiency

The built output of each package is not even `200 KB` in size, making it a lightweight and efficient solution for your Versia needs. Installing the package adds around `5 MB` to your `node_modules` folder, but this does not affect the final bundle size.

Compilation (bundling/minifying) time is a few seconds, almost all of which is spent on type-checking. The actual compilation time is less than a tenth of a second.

## Usage

### Federation

Please see the [**`@versia/federation` README**](federation/README.md) for more information.

### Client

Please see the [**`@versia/client` README**](client/README.md) for more information.

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

Both packages are distributed as a scoped package on the NPM registry or [JSR](https://jsr.io).

We strongly recommend using JSR over NPM for all your packages that are available on it.

```bash
# NPM version
deno add npm:@versia/federation npm:@versia/client # For Deno
npm install @versia/federation @versia/client # For NPM
yarn add @versia/federation @versia/client # For Yarn
pnpm add @versia/federation @versia/client # For PNPM
bun add @versia/federation @versia/client # For Bun

# JSR version
deno add @versia/federation @versia/client # For Deno
npx jsr add @versia/federation @versia/client # For JSR
yarn dlx jsr add @versia/federation @versia/client # For Yarn
pnpm dlx jsr add @versia/federation @versia/client # For PNPM
bunx jsr add @versia/federation @versia/client # For Bun
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

- [**April John**](https://github.com/cutestnekoaqua): Creator and maintainer of the Versia Server ActivityPub bridge.