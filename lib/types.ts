export type Invoice = {
 key?: string;
 number: number;
 issue_date: string;
 due_date: string;
 from: {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
 };
 to: {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
 };
 items: InvoiceItem[];
 notes: string;
 paid: boolean;
 draft: boolean;
 total: number;
 tax?: number;
 discount?: number;
};

export type InvoiceItem = {
 name: string;
 description: string;
 quantity: number;
 price: number;
 id: string;
};
