import { Source, ArgumentNode } from "graphql";
import { Context } from "apollo-server-core";

class AuthContoller  {
  login(root: Source, args: ArgumentNode, context: Context): any {
    return {
      name: 'Ashok',
      email: 'akvlko@gmailcom'
    }
  }
}

export default new AuthContoller();