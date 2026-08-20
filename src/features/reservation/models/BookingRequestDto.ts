export interface BookingRequestDTO {
  seaSideResortId: number;
  numberRow: number;
  numberBeachTent: number;
  startDate: string; // Formato YYYY-MM-DD para Java LocalDate
  endDate: string;   // Formato YYYY-MM-DD para Java LocalDate
  payPartial: boolean;
}