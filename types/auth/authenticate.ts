export interface AuthenticateApiSuccess {
  token?: string;
  preferences?: unknown[];
  nombre_usuario?: string;
  tokenCDC?: string;
  usuario?: string | null;
}

export interface AuthenticateApiError {
  type: string;
  title: string;
  status: number;
  detail: string;
  exceptionDetails: ExceptionDetail[];
  traceId: string;
}

export interface ExceptionDetail {
  message: string;
  type: string;
  raw: string;
  stackFrames: StackFrame[];
}

export interface StackFrame {
  function: string;
  filePath?: string;
  fileName?: string;
  line?: number;
  preContextLine?: number;
  preContextCode?: string[];
  contextCode?: string[];
  postContextCode?: string[];
}

export type AuthenticateApiResponse = AuthenticateApiSuccess | AuthenticateApiError;
