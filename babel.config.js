module.exports = {
  plugins: [
    ["module:react-native-dotenv"]
  ]
};

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
