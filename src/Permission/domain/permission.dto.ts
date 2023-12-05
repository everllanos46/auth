export class Policy {
  name: string;
  description: string;
  logic: string;
  roles: Rol[];
}

export class PolicyEdit {
  id: string;
  name: string;
  description: string;
  'type': string;
  logic: string;
  decisionStrategy: string;
  roles: Rol[];
  policies: [];
}
class Rol {
  id: string;
  required: boolean;
}
