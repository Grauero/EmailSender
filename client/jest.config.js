module.exports = {
  testEnvironment: 'node',
  verbose: true,
  setupTestFrameworkScriptFile: '<rootDir>/mocks/jest.setup.ts',
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg)$': '<rootDir>/mocks/fileMock.ts'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '\\.(ts|tsx)$': 'ts-jest'
  },
  testRegex: '/__tests__/.*\\.(ts|tsx|js)$',
  testURL: 'http://localhost:80'
};
