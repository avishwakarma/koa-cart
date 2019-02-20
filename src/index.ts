import * as Koa from 'koa';
import { ApolloServer } from 'apollo-server-koa';

const server: ApolloServer = new ApolloServer({});

const app: Koa = new Koa();
server.applyMiddleware({ app });

app.listen(4000, '0.0.0.0', () => {
  console.log('server started at http://0.0.0.0:4000');
});