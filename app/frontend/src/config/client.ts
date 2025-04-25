const configInfo = {
  api: {
    protocol: "http",
    host: "localhost",
    port: 7082,
    prefix: "api",
  },
};

const config = {
  endpoint: `${configInfo.api.protocol}://${configInfo.api.host}:${configInfo.api.port}/${configInfo.api.prefix}/`,
};

// Export using ES module syntax
export default config;
