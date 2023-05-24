module.exports = {
    webpack: {
      configure: webpackConfig => {
        const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
          ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin'
        );
  
        webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);
        webpackConfig['resolve'] = {
          fallback: {
            crypto: require.resolve("crypto-browserify"),
            buffer: require.resolve("buffer"),
            stream: require.resolve("stream-browserify"),
          },
        }
        return webpackConfig;
      },
    },
  };