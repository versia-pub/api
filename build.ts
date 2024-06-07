import dts from "bun-plugin-dts";
import ora from "ora";

for (const pkg of ["federation", "client"]) {
    const subSpinner = ora(`Building ${pkg} module`).start();

    await Bun.build({
        entrypoints: [`${pkg}/index.ts`],
        outdir: `${pkg}/dist`,
        format: "esm",
        minify: true,
        sourcemap: "external",
        splitting: true,
        target: "browser",
        plugins: [dts()],
    }).then((output) => {
        if (!output.success) {
            subSpinner.fail(`Failed to build ${pkg} module`);
            console.error(output.logs);
            process.exit(1);
        }
    });

    subSpinner.succeed(`Built ${pkg} module`);
}
