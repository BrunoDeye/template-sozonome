import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    expires: string;
    user: {
      email: string | null | undefined;
      id: number;
      image: string | null;
      name: string;
      phoneNumber: string;
      isMatched: boolean | null | undefined;
      isUpdated: boolean | null | undefined;
    };
  }
}

import { JWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    name: string | null;
    email: string | null;
    image?: string | null | undefined;
    picture: string;
    phoneNumber: string;
    sub?: any;
    isMatched?: boolean | null;
    isUpdated?: boolean | null | undefined;
  }
}

declare module "@tanstack/react-table" {
  interface CellContext<TData extends RowData, TValue> {
    additionalProp: string;
  }
}