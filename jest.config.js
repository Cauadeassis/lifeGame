const dotenv = require("dotenv");
dotenv.config({
  path: ".env.development",
});
const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: ".",
});

const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testEnvironment: "jest-environment-jsdom",
});
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // 👈 aqui
  testEnvironment: "jsdom",
};
module.exports = { ...jestConfig, ...customJestConfig };

module.exports = jestConfig;
