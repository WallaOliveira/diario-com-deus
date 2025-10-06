// Mensagens de erro humanizadas

export const ERROR_MESSAGES: Record<string, string> = {
  // Auth errors
  'Invalid login credentials': 'E-mail ou senha incorretos. Tente novamente.',
  'User already registered': 'Este e-mail já está cadastrado. Faça login ou use outro e-mail.',
  'Email not confirmed': 'Por favor, confirme seu e-mail antes de fazer login.',
  'Invalid email': 'Por favor, digite um e-mail válido.',
  'Password should be at least 6 characters': 'A senha deve ter pelo menos 6 caracteres.',
  'User not found': 'Usuário não encontrado. Verifique seu e-mail.',
  'Email rate limit exceeded': 'Muitas tentativas. Aguarde alguns minutos e tente novamente.',
  'Invalid API key': 'Erro de configuração. Entre em contato com o suporte.',
  
  // Network errors
  'Failed to fetch': 'Sem conexão com a internet. Verifique sua conexão e tente novamente.',
  'Network error': 'Erro de conexão. Tente novamente em alguns instantes.',
  'Timeout': 'A operação demorou muito. Tente novamente.',
  
  // Generic
  'Something went wrong': 'Algo deu errado. Tente novamente.',
};

export function getErrorMessage(error: string | Error): string {
  const message = typeof error === 'string' ? error : error.message;
  
  // Buscar mensagem humanizada
  for (const [key, value] of Object.entries(ERROR_MESSAGES)) {
    if (message.includes(key)) {
      return value;
    }
  }
  
  // Se não encontrar, retornar mensagem genérica
  return ERROR_MESSAGES['Something went wrong'];
}

// Helper para toast notifications (opcional)
export function showError(error: string | Error) {
  const message = getErrorMessage(error);
  console.error('Error:', error);
  return message;
}

