import type {Config} from 'jest';

const config: Config = {
  preset: 'ts-jest',
  clearMocks: true,
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@test/(.*)$': '<rootDir>/test/$1',
  },
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: ['./src/**'],
  coverageReporters: ['json-summary', 'text', 'lcov'],
};

export default config;
