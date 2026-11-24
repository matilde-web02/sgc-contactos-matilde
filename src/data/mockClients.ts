import { Client } from '../types/client';

// Registos estáticos utilizados para alimentar a navegação do protótipo
export const MOCK_CLIENTS: Client[] = [
  {
    id: '1',
    initials: 'AM',
    name: 'Ana Matos',
    phone: '923 456 789',
    address: 'Rua 12, Bairro Central',
    shortService: 'Corte',
    lastService: 'Corte de cabelo',
    lastServiceDate: '12/11/2026',
  },
  {
    id: '2',
    initials: 'CN',
    name: 'Carlos Neto',
    phone: '912 345 678',
    address: 'Avenida 21 de Janeiro, Maianga',
    shortService: 'Canalização',
    lastService: 'Reparação de canalização',
    lastServiceDate: '10/11/2026',
  },
  {
    id: '3',
    initials: 'ML',
    name: 'Marta Lopes',
    phone: '937 000 111',
    address: 'Rua da Missão, Ingombota',
    shortService: 'Manicure',
    lastService: 'Manicure e pedicure',
    lastServiceDate: '08/11/2026',
  },
];

export const TOTAL_REGISTERED_CLIENTS = 3;
