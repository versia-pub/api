import pkg from "@/federation/package.json" with { type: "json" };

export const DEFAULT_UA = `LysandFederation/${pkg.version} (+${pkg.homepage})`;
