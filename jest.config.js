export default {
  testEnvironment: "jsdom", // Use jsdom for testing React components
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"], // Setup file for additional configurations
  moduleNameMapper: {
    "\\.(css|scss|sass)$": "identity-obj-proxy", // Mock CSS imports
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.cjs", // Mock image imports
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-responsive-carousel)/)", // Add any other dependencies here
  ],
  transform: {
    "^.+\\.jsx?$": "babel-jest", // Transform JavaScript/JSX files using Babel
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/"], // Ignore these directories
};
