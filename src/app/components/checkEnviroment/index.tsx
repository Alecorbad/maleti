
// https://stackoverflow.com/questions/74966208/next-js-typeerror-failed-to-parse-url-from-api-projects-or-error-connect-econ

export const checkEnvironment = () => {
  return process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://example.com"; // https://v2ds.netlify.app
};
