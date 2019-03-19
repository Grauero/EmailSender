module.exports = {
  testEnvironment: 'node',
  verbose: true,
  setupFiles: ['<rootDir>/mocks/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg)$': '<rootDir>/mocks/fileMock.ts'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '\\.(ts|tsx|js)$': 'babel-jest'
  },
  transformIgnorePatterns: ['node_modules/'],
  testRegex: '/__tests__/.*\\.(ts|tsx)$',
  testURL: 'http://localhost:80'
};
