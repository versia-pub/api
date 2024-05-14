import dts from "bun-plugin-dts";
import ora from "ora";

const spinner = ora("Building...").start();

await Bun.build({
    entrypoints: ["federation/index.ts"],
    outdir: "federation/dist",
    format: "esm",
    minify: true,
    sourcemap: "external",
    splitting: true,
    target: "browser",
    plugins: [dts()],
});

spinner.succeed("Built federation module");
