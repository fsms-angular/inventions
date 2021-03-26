module.exports = {
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'test_results',
        outputName: 'jest-junit.xml',
        suiteName: 'Angular Inventions Tests',
      },
    ],
  ],
  projects: [
    '<rootDir>/apps/example',
    '<rootDir>/libs/pubsub',
    '<rootDir>/libs/utils',
  ],
};
