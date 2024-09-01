/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  transform: {'\\.[jt]sx?$': ['ts-jest', { useESM: true }] },
  testRegex: '((\\.|/)(test|spec))\\.tsx?$',
    extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}

