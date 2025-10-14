// helpdesk-models.ts

// =================================================================
// ENUMS
// Descrição: Enumerações para valores fixos usados no sistema.
// =================================================================

export enum CategoryEnum {
    devices = 1,
}

export enum LogTypeEnum {
    login = 1,
    logout = 2,
    register = 3,
    ticket = 4,
    report = 5,
}

export enum PriorityEnum {
    high = 1,
    medium = 2,
    low = 3,
}

export enum StatusTicketEnum {
    pending = 1,
    in_progress = 2,
    resolved = 3,
    canceled = 4,
}

export enum StatusUserEnum {
    Online = 1,
    Offline = 2,
    absent = 3,
}

export enum UserTypeEnum {
    Administrator = 1,
    Attendant = 2,
    Requester = 3,
}


// =================================================================
// INTERFACES
// Descrição: Define a estrutura dos objetos de dados da aplicação.
// =================================================================

/**
 * Representa um usuário do sistema.
 * Nota: A propriedade passwordHash foi omitida por segurança.
 */
export interface User {
    id: string; // Guid
    name: string;
    email: string;
    cpf: string;
    phone: string;
    position: string;
    status: StatusUserEnum;
    createdAt: string; // DateTime
    userType: UserTypeEnum;
}

/**
 * Representa um ticket de suporte.
 * As propriedades 'requester' e 'attendant' são objetos User completos.
 */
export interface Ticket {
    id: string; // Guid
    status: StatusTicketEnum;
    priority: PriorityEnum;
    category: CategoryEnum;
    evaluation?: number;
    title: string;
    description: string;
    createdAt: string; // DateTime
    updatedAt: string | null; // DateTime?

    ticketResponses?: TicketResponse[];

    requesterId?: string; // Guid
    requester?: User;

    attendantId?: string | null; // Guid?
    attendant?: User | null;
}

/**
 * Representa uma resposta ou comentário dentro de um ticket.
 */
export interface TicketResponse {
    id: string; // Guid
    ticketId: string; // Guid
    ticket?: Ticket; // Propriedade de navegação, geralmente opcional no front-end
    userId: string; // Guid
    user: User;
    description: string;
    createdAt: string; // DateTime
}

/**
 * Representa uma mensagem dentro de uma conversação de chat.
 */
export interface ChatMessage {
    id: string; // Guid
    role: string;
    content: string;
    sequence: number;
    createdAt: string; // DateTime
    conversationId: string; // Guid
    conversation?: Conversation; // Propriedade de navegação
}

export interface Conversation {
    id: string; // Guid
    userId: string; // Guid
    title: string | null;
    createdAt: string; // DateTime
    updatedAt: string; // DateTime
    messages: ChatMessage[];
}

/**
* Um wrapper genérico para respostas da API, indicando o status
* da operação e retornando os dados.
*/
export interface ServiceResponse<T> {
    data: T | null;
    message: string;
    status: boolean;
}