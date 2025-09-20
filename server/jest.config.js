// jest.config.js
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true }],
  },
  
  
  moduleNameMapper: {
  "^@/(.*)\\.js$": "<rootDir>/src/$1.ts",
  "^@/(.*)$": "<rootDir>/src/$1",
  "^@fs/(.*)\\.js$": "<rootDir>/src/endpoints/fs/$1.ts",
  "^@fs/(.*)$": "<rootDir>/src/endpoints/fs/$1",
  "^@food/(.*)\\.js$": "<rootDir>/src/endpoints/open-food-facts/$1.ts",
  "^@food/(.*)$": "<rootDir>/src/endpoints/open-food-facts/$1"
},
};
