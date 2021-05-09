module.exports = {
  schema: [
    {
      "https://alquileres.hasura.app/v1/graphql": {
        headers: {
          "x-hasura-admin-secret": "MgWg33V3aiSQToJAjOQ2zZrLe6996QtCCXgo7xTUmV9BglgBL3uR3goeOxWtaK8j",
        },
      },
    },
  ],
  documents: ["./src/**/*.tsx", "./src/**/*.ts"],
  overwrite: true,
  generates: {
    "./src/generated/graphql.tsx": {
      plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};
