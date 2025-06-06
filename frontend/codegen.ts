import type { CodegenConfig } from "@graphql-codegen/cli";
// import { defineConfig } from '@eddeee888/gcg-typescript-resolver-files'

const config: CodegenConfig = {
  schema: "./graphql/schema/**/*.graphql",
  documents: ["./graphql/operations/**/*.graphql"],
  generates: {
    "./src/generated/resolvers-types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      // config: {
      //   useIndexSignature: true,
      // },
    },
    "./src/generated/schema.graphql": {
      plugins: ["schema-ast"],
      config: {
        includeDirectives: true,
      },
    },
    "./src/generated/graphql.ts": {
      plugins: ["typescript"],
      config: {
        scalars: {
          DateTime: "Date",
        },
      },
    },
  },
};

export default config;
