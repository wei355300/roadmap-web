declare namespace User {

  type Permission = {
    key: string;
    value: string;
  }

  type CurrentUser = {
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    access?: Permission[];
    address?: string;
    phone?: string;
  }

  type Account = {
    userId?: int;
    token: string;
    expiration: string;
    nonLocked: boolean;
    status: boolean;
    authorities: string[];
  }
}
