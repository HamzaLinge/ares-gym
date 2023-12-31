import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  roots: ["<rootDir>/src"],
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["src/dist/", "node_modules/"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["<rootDir>/src/**/*.test.(ts|tsx)"],
  setupFilesAfterEnv: ["./jest.setup.ts"],
};

export default config;
