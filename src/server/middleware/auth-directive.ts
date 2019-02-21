import {SchemaDirectiveVisitor, AuthenticationError, ApolloError} from 'apollo-server-koa';
import { GraphQLField } from 'graphql';

export default class AuthDiretive extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve } = field;
    
    field.resolve = async (root, args, context) => {
      if(context.error) {
        throw new ApolloError('Invalid token', 'INVALID_TOKEN');
      }
      
      if(!context.session || !context.session.user) {
        throw new AuthenticationError('Authentication credentials are missing or invalid.');
      }

      return await resolve.call(this, root, args, context);
    }
  }
}