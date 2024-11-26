import path from "path";

import { pathsToModuleNameMapper } from "ts-jest";
import aliases from "./tsconfig.paths.json";

const getWebpackAliasesFromPaths = (configPaths: Record<string, string[]>) => {
  const alias = Object.entries(configPaths).reduce(
    (webpackAliases, [configAlias, configPathList]) => {
      const [aliasKey] = configAlias.split("/");
      const [relativePathToDir] = configPathList[0].split("/*");

      return {
        ...webpackAliases,
        ...(configAlias.includes("/*") && configPathList[0].includes("/*")
          ? { [configAlias]: path.resolve(__dirname, configPathList[0]) }
          : { [aliasKey]: path.resolve(__dirname, relativePathToDir) }),
      };
    },
    {} as Record<string, string>
  );
  return alias;
};

const config = {
  typescript: {
    enableTypeChecking: true,
  },
  webpack: {
    alias: getWebpackAliasesFromPaths(aliases.compilerOptions.paths),
  },
  jest: {
    configure: {
      preset: "ts-jest",
      moduleNameMapper: {
        ...pathsToModuleNameMapper(aliases.compilerOptions.paths, {
          prefix: "<rootDir>/",
        }),
      },
      globals: {
        CONFIG: true,
      },
    },
  },
};

export default config;
