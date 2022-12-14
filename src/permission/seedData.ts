import { Permission } from './schema/permission.schema';

export const seedData = [
  // #region User
  { name: 'GetUser', description: '' },
  { name: 'CreateUser', description: '' },
  { name: 'UpdateUser', description: '' },
  { name: 'DeleteUser', description: '' },
  // #endregion User
  // #region Role
  { name: 'GetRole', description: '' },
  { name: 'CreateRole', description: '' },
  { name: 'UpdateRole', description: '' },
  { name: 'DeleteRole', description: '' },
  // #endregion Role
  // #region Product
  { name: 'GetProduct', description: '' },
  { name: 'CreateProduct', description: '' },
  { name: 'UpdateProduct', description: '' },
  { name: 'DeleteProduct', description: '' },
  // #endregion Product
] as Permission[];
