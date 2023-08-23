export type Invoice = {
 key?: string;
 name: string;
 issue_date: string;
 due_date: string;
 from: Contact;
 to: Contact;
 items: InvoiceItem[];
 notes: string;
 paid: boolean;
 draft: boolean;
 total: number;
 tax?: number;
 discount?: number;
};

export type Contact = {
 name: string;
 address?: string;
 city?: string;
 state?: string;
 zip?: string;
 country?: string;
 vatId?: string;
 iban?: string;
 swift?: string;
 currency?: string;
};

export type InvoiceItem = {
 name: string;
 description: string;
 quantity: number;
 price: number;
 id: string;
};
