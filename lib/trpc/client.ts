import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../../marketing-dashboard-api/lib/server';

export const trpc = createTRPCReact<AppRouter>();
