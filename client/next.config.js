// next.config.js
const removeImports = require("next-remove-imports")();
module.exports = removeImports({
  experimental: { esmExternals: true },
  env: {
    MONGODB_URL:
      "mongodb+srv://rfn900:yBktHjkV57ysh3K@cluster0.gaxxk.mongodb.net/todo_app?retryWrites=true&w=majority",
    BACKEND_URL: "https://rod-todos.herokuapp.com/api/v1",
  },
});
