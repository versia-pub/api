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
}).then((output) => {
    if (!output.success) {
        spinner.fail("Failed to build federation module");
        console.error(output.logs);
        process.exit(1);
    }
});

spinner.succeed("Built federation module");
