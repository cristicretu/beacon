export type Invoice = {
 key?: string;
 name: string;
 issue_date: string;
 due_date: string;
 from: Contact;
 to: Contact;
 items: InvoiceItem[];
 sub_items: InvoiceSubItem[];
 notes: string;
 paid: boolean;
 draft: boolean;
 total: number;
};

export type InvoiceItem = {
 name: string;
 description: string;
 quantity: number;
 price: number;
 id: string;
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
 contact_since?: string;
};

export type InvoiceSubItem = {
 name: string;
 price: number;
 id: string;
};
