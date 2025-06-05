import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./graphql/schema/**/*.graphql",
  documents: ["./graphql/operations/**/*.graphql"],
  generates: {
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