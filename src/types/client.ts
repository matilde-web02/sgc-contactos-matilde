export interface Client {
  id: string;
  initials: string;
  name: string;
  phone: string;
  address: string;
  shortService: string;
  lastService: string;
  lastServiceDate: string;
}

// Tipagem centralizada das rotas e parâmetros aceites pelo Stack Navigator
export type RootStackParamList = {
  Home: undefined;
  ClientsList: undefined;
  ClientDetails: { client?: Client } | undefined;
  ClientForm: { mode: 'create' | 'edit'; client?: Client };
};
