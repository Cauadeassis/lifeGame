import dotenv from "dotenv";
dotenv.config({
  path: ".env.development",
});
import nextJest from "next/jest";
const createJestConfig = nextJest({
  dir: ".",
});

const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testEnvironment: "jest-environment-jsdom",
});
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
};
export default {
  ...jestConfig,
  ...customJestConfig,
};
