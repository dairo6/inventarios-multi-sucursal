export interface LoginI {
  email: string;
  password: string;
}


export interface LoginResponseI {
  token: string;
  refreshToken?: string;
  user: {
    id: number;
    username: string;
    email: string;
    password: string;
    is_active: "ACTIVE" | "INACTIVE";
    avatar: string | null;
    RoleUsers: {
      id: number;
      user_id: number;
      role_id: number;
      is_active: string;
      Role: {
        id: number;
        name: string;
        is_active: string;
      };
    }[];
  };
}



export interface RegisterI {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponseI {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    password: string;
    is_active: "ACTIVE" | "INACTIVE";
    avatar: string;
    role?: {
      id: number;
      name: string;
    };
  };
}



export interface UserI {
  id: number;
  username: string;
  email: string;
  password: string;
  is_active: "ACTIVE" | "INACTIVE";
  avatar: string;
  role?: {
    id: number;
    name: string;
  };
}