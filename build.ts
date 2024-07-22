import dts from "bun-plugin-dts";
import ora from "ora";

const entrypoints = {
    federation: ["index.ts", "schemas.ts"],
    client: ["index.ts", "types.ts"],
};

for (const pkg of ["federation", "client"]) {
    const subSpinner = ora(`Building ${pkg} module`).start();

    await Bun.build({
        entrypoints: entrypoints[pkg as "federation" | "client"].map(
            (entrypoint) => `${pkg}/${entrypoint}`,
        ),
        outdir: `${pkg}/dist`,
        format: "esm",
        minify: false,
        sourcemap: "external",
        splitting: true,
        target: "browser",
        plugins: [
            dts({
                output: {
                    noBanner: true,
                },
            }),
        ],
    }).then((output) => {
        if (!output.success) {
            subSpinner.fail(`Failed to build ${pkg} module`);
            console.error(output.logs);
            process.exit(1);
        }
    });

    subSpinner.succeed(`Built ${pkg} module`);
}
