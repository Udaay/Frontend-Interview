export interface ISeatCategory {
  categoryName: string;
  price: number;
  seatRows: ISeatRows[]
}

export interface ISeatRows {
  rowNumber: string;
  seats: ISeat[];
}

export type BookingStatus = "BOOKED" | "AVAILABLE" | "NO_SEAT" | "BLOCKED"

export interface ISeat {
  seatNumber: number;
  id: string
  status: BookingStatus
}

export interface ISeatArrangement {
  categories: ISeatCategory[]
}



