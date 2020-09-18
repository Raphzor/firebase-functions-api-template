module.exports = {
  preset: "ts-jest/presets/js-with-babel",
  testEnvironment: "node",
  testRegex: ["\\.test\\.ts$"],
  globals: {
    babelConfig: true,
  },
};
