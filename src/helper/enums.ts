import { CategoryEnum, LogTypeEnum, PriorityEnum, StatusTicketEnum, StatusUserEnum, UserTypeEnum } from "@/utils/types";
// =================================================================
// Funções para PriorityEnum
// =================================================================

/**
 * Converte uma string (como 'high', 'medium') para o valor numérico de PriorityEnum.
 * Retorna undefined se a string não corresponder a nenhuma chave.
 * @param key A string a ser convertida.
 * @returns O valor do enum ou undefined.
 */
export function getPriorityEnumFromString(key: string): PriorityEnum | undefined {
  // Converte a chave para minúsculas para ser case-insensitive
  const lowerKey = key.toLowerCase();
  // Obtém as chaves do enum que não são números (isso evita as chaves de mapeamento reverso)
  const enumKeys = Object.keys(PriorityEnum).filter(k => isNaN(Number(k)));

  // Procura a chave no enum
  const foundKey = enumKeys.find(k => k.toLowerCase() === lowerKey);

  return foundKey ? PriorityEnum[foundKey as keyof typeof PriorityEnum] : undefined;
}

/**
 * Converte um valor numérico de PriorityEnum para sua representação em string.
 * @param value O valor numérico do enum.
 * @returns A string correspondente (ex: "high") ou undefined.
 */
export function getPriorityStringFromEnum(value: PriorityEnum): string | undefined {
  return PriorityEnum[value];
}


// =================================================================
// Funções para StatusTicketEnum
// =================================================================

export function getStatusTicketEnumFromString(key: string): StatusTicketEnum | undefined {
  const lowerKey = key.toLowerCase();
  const enumKeys = Object.keys(StatusTicketEnum).filter(k => isNaN(Number(k)));
  const foundKey = enumKeys.find(k => k.toLowerCase() === lowerKey);
  return foundKey ? StatusTicketEnum[foundKey as keyof typeof StatusTicketEnum] : undefined;
}

export function getStatusTicketStringFromEnum(value: StatusTicketEnum): string | undefined {
  return StatusTicketEnum[value];
}


// =================================================================
// Funções para CategoryEnum
// =================================================================

export function getCategoryEnumFromString(key: string): CategoryEnum | undefined {
  const lowerKey = key.toLowerCase();
  const enumKeys = Object.keys(CategoryEnum).filter(k => isNaN(Number(k)));
  const foundKey = enumKeys.find(k => k.toLowerCase() === lowerKey);
  return foundKey ? CategoryEnum[foundKey as keyof typeof CategoryEnum] : undefined;
}

export function getCategoryStringFromEnum(value: CategoryEnum): string | undefined {
  return CategoryEnum[value];
}


// =================================================================
// Funções para StatusUserEnum
// =================================================================

export function getStatusUserEnumFromString(key: string): StatusUserEnum | undefined {
  const lowerKey = key.toLowerCase();
  const enumKeys = Object.keys(StatusUserEnum).filter(k => isNaN(Number(k)));
  const foundKey = enumKeys.find(k => k.toLowerCase() === lowerKey);
  return foundKey ? StatusUserEnum[foundKey as keyof typeof StatusUserEnum] : undefined;
}

export function getStatusUserStringFromEnum(value: StatusUserEnum): string | undefined {
  return StatusUserEnum[value];
}


// =================================================================
// Funções para UserTypeEnum
// =================================================================

export function getUserTypeEnumFromString(key: string): UserTypeEnum | undefined {
  const lowerKey = key.toLowerCase();
  const enumKeys = Object.keys(UserTypeEnum).filter(k => isNaN(Number(k)));
  const foundKey = enumKeys.find(k => k.toLowerCase() === lowerKey);
  return foundKey ? UserTypeEnum[foundKey as keyof typeof UserTypeEnum] : undefined;
}

export function getUserTypeStringFromEnum(value: UserTypeEnum): string | undefined {
  return UserTypeEnum[value];
}


// =================================================================
// Funções para LogTypeEnum
// =================================================================

export function getLogTypeEnumFromString(key: string): LogTypeEnum | undefined {
  const lowerKey = key.toLowerCase();
  const enumKeys = Object.keys(LogTypeEnum).filter(k => isNaN(Number(k)));
  const foundKey = enumKeys.find(k => k.toLowerCase() === lowerKey);
  return foundKey ? LogTypeEnum[foundKey as keyof typeof LogTypeEnum] : undefined;
}

export function getLogTypeStringFromEnum(value: LogTypeEnum): string | undefined {
  return LogTypeEnum[value];
}


const priorityTranslations: Record<PriorityEnum, string> = {
  [PriorityEnum.high]: 'Alta',
  [PriorityEnum.medium]: 'Média',
  [PriorityEnum.low]: 'Baixa',
};

/**
 * Retorna a tradução em português para um valor de PriorityEnum.
 * @param value O valor numérico do enum (ex: 1).
 * @returns A string traduzida (ex: "Alta").
 */
export function getPriorityInPortuguese(value: PriorityEnum): string {
  return priorityTranslations[value] || 'Prioridade desconhecida';
}


// --- Tradução para StatusTicketEnum ---
const statusTicketTranslations: Record<StatusTicketEnum, string> = {
  [StatusTicketEnum.pending]: 'Pendente',
  [StatusTicketEnum.in_progress]: 'Em Andamento',
  [StatusTicketEnum.resolved]: 'Resolvido',
  [StatusTicketEnum.canceled]: 'Cancelado',
};

/**
 * Retorna a tradução em português para um valor de StatusTicketEnum.
 * @param value O valor numérico do enum (ex: 2).
 * @returns A string traduzida (ex: "Em Andamento").
 */
export function getStatusTicketInPortuguese(value: StatusTicketEnum): string {
  return statusTicketTranslations[value] || 'Status desconhecido';
}


// --- Tradução para CategoryEnum ---
const categoryTranslations: Record<CategoryEnum, string> = {
  [CategoryEnum.technicalSupport]: 'Suporte Técnico',
  [CategoryEnum.infrastructure]: 'Infraestrutura',
  [CategoryEnum.software]: 'Software',
  [CategoryEnum.hardware]: 'Hardware',
  [CategoryEnum.network]: 'Rede',
};


export function getCategoryInPortuguese(value: CategoryEnum): string {
  return categoryTranslations[value] || 'Categoria desconhecida';
}



// --- Tradução para StatusUserEnum ---
const statusUserTranslations: Record<StatusUserEnum, string> = {
  [StatusUserEnum.Online]: 'Online',
  [StatusUserEnum.Offline]: 'Offline',
  [StatusUserEnum.absent]: 'Ausente',
};

export function getStatusUserInPortuguese(value: StatusUserEnum): string {
  return statusUserTranslations[value] || 'Status desconhecido';
}


// --- Tradução para UserTypeEnum ---
const userTypeTranslations: Record<UserTypeEnum, string> = {
  [UserTypeEnum.Administrator]: 'Administrador',
  [UserTypeEnum.Attendant]: 'Atendente',
  [UserTypeEnum.Requester]: 'Solicitante',
};

export function getUserTypeInPortuguese(value: UserTypeEnum): string {
  return userTypeTranslations[value] || 'Tipo de usuário desconhecido';
}


const logTypeTranslations: Record<LogTypeEnum, string> = {
  [LogTypeEnum.login]: 'Login',
  [LogTypeEnum.logout]: 'Logout',
  [LogTypeEnum.register]: 'Cadastro',
  [LogTypeEnum.ticket]: 'Ticket',
  [LogTypeEnum.report]: 'Relatório',
};

export function getLogTypeInPortuguese(value: LogTypeEnum): string {
  return logTypeTranslations[value] || 'Tipo de log desconhecido';
}