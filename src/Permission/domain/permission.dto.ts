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

export class Permission {
  resources: string[];
  policies: string[];
  name: string;
  description: string;
  decisionStrategy: string;
}

export class PermissionEdit {
  id: string;
  resources: string[];
  policies: string[];
  name: string;
  description: string;
  decisionStrategy: string;
  logic: string;
  type: string;
}

class Rol {
  id: string;
  required: boolean;
}
