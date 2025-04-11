export interface ApiResponse<T> {
  statusCode: number;
  status: string;
  message: string | null;
  data: T | null;
}
