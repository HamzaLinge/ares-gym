// jest.config.ts
import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  modulePathIgnorePatterns: ["src/dist/", "node_modules/"],
  // globals: {
  //   "ts-jest": {
  //     tsconfig: "tsconfig.json",
  //   },
  // },
  testMatch: ["<rootDir>/src/__tests__/**/*.test.ts"],
  // setupFiles: ["./jest.setup.ts"],
};

export default config;
