export interface ApiResponse<T> {
  isSuccess: boolean;
  message?: string;
  data?: T;
  errorCode?: string;
  errors?: string[];
}