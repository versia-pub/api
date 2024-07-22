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
import type { Note } from "@lysand-org/federation/types";

const validNoteObject: Note = {
    type: "Note",
    // ...
};

const validNote = await validator.Note(validNoteObject);

// validNote is still the same as noteObject
```

Your editor's IntelliSense should provide you with every method and property available, which all match the [**Lysand**](https://lysand.org) specification names.

#### Requester

A `FederationRequester` class is provided to make requests to a remote server. It sets the correct headers and has multiple methods to make requesters easier.

```typescript
import { FederationRequester, SignatureConstructor } from "@lysand-org/federation";

const requester = new FederationRequester(
    new URL("https://example.com"),
    new SignatureConstructor(privateKey, keyId),
);

const { data, ok } = await requester.get<User>("/users/1");

if (!ok) {
    console.error(data);
}

console.log(data);

// Do a WebFinger request
const userProfileUri = await requester.webFinger("banana");
```

#### Validation Helper

`RequestParserHandler` is a class to parse the body of a request and call the appropriate callback. It is a helper for the `EntityValidator` class.

```typescript
const body = { ... };
const validator = new EntityValidator();
const parser = new RequestParserHandler(body, validator);

// Throws an error if the object is invalid
// Same error as above
await parser.parseBody({
    note: (note) => {
        // If the object is a Note, this will be called
        console.log(note);
    },
    follow: (follow) => {
        // If the object is a Follow, this will be called
        console.log(follow);
    },
    ...
});
```

#### Cryptography

The cryptography module provides two main classes: [`SignatureConstructor`](federation/cryptography/index.ts) and [`SignatureValidator`](federation/cryptography/index.ts). These classes are used to construct and validate signatures for requests, respectively.

##### SignatureConstructor

The [`SignatureConstructor`](federation/cryptography/index.ts) class is used to construct a signature for a request. It can be instantiated with a private key and a key ID:

```ts
const privateKey = // CryptoKey
const keyId = "https://example.com/users/6a18f2c3-120e-4949-bda4-2aa4c8264d51";
const constructor = new SignatureConstructor(privateKey, keyId);
```

Alternatively, you can create a `SignatureConstructor` instance from a base64-encoded private key:

```ts
const privateKey = "base64PrivateKey";
const keyId = "https://example.com/users/6a18f2c3-120e-4949-bda4-2aa4c8264d51";
const constructor = await SignatureConstructor.fromStringKey(privateKey, keyId);
```

The `sign` method is used to sign a request:

```ts
const request = new Request();
// Returns a Request object with Signature and Date set
const signature = await constructor.sign(request);
// Alternatively
// Returns a Header object with Signature and Date set
const signature = await constructor.sign(date, method, url, body);
```

##### SignatureValidator

The [`SignatureValidator`](federation/cryptography/index.ts) class is used to validate the signature of a request. It can be instantiated with a public key:

```ts
const publicKey = // CryptoKey
const validator = new SignatureValidator(publicKey);
```

Alternatively, you can create a `SignatureValidator` instance from a base64-encoded public key:

```ts
const publicKey = "base64PublicKey";
const validator = await SignatureValidator.fromStringKey(publicKey);
```

The `validate` method is used to validate a request or signature:

```ts
const request = new Request();
// Returns boolean or TypeError if data is invalid
const isValid = await validator.validate(request);
// Alternatively
// Returns boolean or TypeError if data is invalid
const isValid = await validator.validate(signature, date, method, url, body);
```

Please note that these classes require the WebCrypto API and Ed25519 support in the environment. WebCrypto support is automatically checked, but Ed25519 cannot be as far as I know.

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

Package is distributed as a scoped package on the NPM registry and [JSR](https://jsr.io).

We strongly recommend using JSR over NPM for all your packages that are available on it.

```bash
# NPM version
deno add npm:@lysand-org/federation # For Deno
npm install @lysand-org/federation # For NPM
yarn add @lysand-org/federation # For Yarn
pnpm add @lysand-org/federation # For PNPM
bun add @lysand-org/federation # For Bun

# JSR version
deno add @lysand-org/federation # For Deno
npx jsr add @lysand-org/federation # For JSR
yarn dlx jsr add @lysand-org/federation # For Yarn
pnpm dlx jsr add @lysand-org/federation # For PNPM
bunx jsr add @lysand-org/federation # For Bun
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
