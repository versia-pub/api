import pkg from "../package.json" with { type: "json" };

export const DEFAULT_UA = `VersiaFederation/${pkg.version} (+${pkg.homepage})`;
