import type { CodegenConfig } from "@graphql-codegen/cli";
// import { defineConfig } from '@eddeee888/gcg-typescript-resolver-files'

const config: CodegenConfig = {
  schema: "./graphql/schema/**/*.graphql",
  documents: ["./graphql/operations/**/*.graphql"],
  config: {
    avoidOptionals: true,
  },
  generates: {
    "./src/generated/resolvers-types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      // config: {
      //   useIndexSignature: true,
      // },
    },

    // API向けの統合後スキーマ
    "./src/generated/schema.graphql": {
      plugins: ["schema-ast"],
      config: {
        includeDirectives: true,
      },
    },
    "./src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-operations"],
      config: {
        scalars: {
          DateTime: "Date",
        },
      },
    },

    // クライアント向けのコード
    "./src/generated/client/": {
      preset: "client",
    },
  },
};

export default config;
