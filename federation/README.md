<p align="center">
  <a href="https://lysand.org"><img src="https://cdn.lysand.org/logo-long-dark.webp" alt="Lysand Logo" height="110"></a>
</p>

<center><h1><code>@lysand-org/federation</code></h1></center>

Federation types, validators and cryptography for Lysand server implementations.

## Efficiency

The built output of the package is not even `200 KB` in size, making it a lightweight and efficient solution for your Lysand needs. Installing the package adds around `5 MB` to your `node_modules` folder, but this does not affect the final bundle size.

Compilation (bundling/minifying) time is a few seconds, almost all of which is spent on type-checking. The actual compilation time is less than a tenth of a second.

## Usage

### Federation

#### Roadmap

- [x] Validation
- [ ] Signing code
- [ ] Advanced validator

#### Validation

[**Zod**](https://zod.dev) is used to validate and parse the objects. All Lysand objects are already written for you.

```typescript
import { EntityValidator, type ValidationError } from "@lysand-org/federation";

const validator = new EntityValidator();

try {
    // Will throw an error when the object is invalid, otherwise return the correct object
    const invalidNote = await validator.Note({
        // This is invalid
        type: "Note",
        content: 123,
    });
} catch (error) {
    // ToString returns the human-friendly error message
    sendUser((error as ValidationError).toString());
}

// Types are also included for TypeScript users that don't use the extracted ones
const validNoteObject: typeof EntityValidator.$Note = {
    type: "Note",
    // ...
};

const validNote = await validator.Note(validNoteObject);

// validNote is still the same as noteObject
```

For more information about Note's methods, see the [**Zod documentation**](https://zod.dev/docs/).

Your editor's IntelliSense should provide you with every method and property available, which all match the [**Lysand**](https://lysand.org) specification names.

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
- (only required for cryptography) [**Ed25519**](https://en.wikipedia.org/wiki/EdDSA) cryptography in the [**WebCrypto API**](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)

#### Runtimes

- **Node.js**: 14.0+ is the minimum (18.0+ for cryptography), but only Node.js 20.0+ (LTS) is officially supported.
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

Cryptography functions are supported in the following browsers:

- **Safari**: 17.0+
- **Chrome**: 113.0+ with `#enable-experimental-web-platform-features` enabled

If you are targeting older browsers, please don't, you are doing yourself a disservice.

Transpilation to non-ES Module environments is not officially supported, but should be simple with the use of a bundler like [**Parcel**](https://parceljs.org) or [**Rollup**](https://rollupjs.org).

### Installation

Package is distributed as a scoped package on the NPM registry.

```bash
npm install @lysand-org/federation # For NPM
yarn add @lysand-org/federation # For Yarn
pnpm add @lysand-org/federation # For PNPM
bun add @lysand-org/federation # For Bun
```

#### From Source

If you want to install from source, you can clone [this repository](https://github.com/lysand-org/api) and run the following commands:

```bash
bun install # Install dependencies

bun run build # Build the packages
```

The built package will be in the `federation/dist` folder.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

### Projects

- [**Bun**](https://bun.sh): Thanks to the Bun team for creating an amazing JavaScript runtime.
- [**TypeScript**](https://www.typescriptlang.org): TypeScript is the backbone of this project.
- [**Node.js**](https://nodejs.org): Node.js created the idea of JavaScript on the server.

### People

- [**April John**](https://github.com/cutestnekoaqua): Creator and maintainer of the Lysand Server ActivityPub bridge.
