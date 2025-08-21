export interface DashboardData {
  totalUsers: number;
  activeUsers: number;
  activeSessions: number;
  processedData: ProcessedDataItem[];
}

export interface ProcessedDataItem {
  id: string;
  type: string;
  status: string;
  processedAt: Date;
  data: any;
}
