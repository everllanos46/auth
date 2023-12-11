export class UserRequest {
  id: string;
}

export class UserReset{
  userId: string;
  value: string;
  type: 'password';
  temporary: boolean= false;
}

export class UserCreate {
  username: string;
  enabled: boolean = true;
  emailVerified: boolean = true;
  email: string;
  firstname: string;
  lastname: string;
  credentials: { value: string }[]; 
}

export class UserEdit {
  userId: string;
  enabled: boolean = true;
  email: string;
  firstname: string;
  lastname: string;
}

export class UserLogin{
  username: string;
  password: string;
  client_secret: string;
}