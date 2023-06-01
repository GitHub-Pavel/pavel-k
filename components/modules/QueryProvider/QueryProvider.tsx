"use client";

import { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from 'react-query';


const queryClient = new QueryClient();

type QueryProviderProps = {
    children: ReactNode;
}

export const QueryProvider: FC<QueryProviderProps> = ({children}) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}