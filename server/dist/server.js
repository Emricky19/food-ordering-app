"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const server = new apollo_server_1.ApolloServer({});
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
//# sourceMappingURL=server.js.map