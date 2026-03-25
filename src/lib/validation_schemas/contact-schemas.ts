import * as z from 'zod';
import type { useTranslations } from 'next-intl';

// ft = field translations, vt = validation translations
export const contactFormSchema = (
  ft?: ReturnType<typeof useTranslations>,
  vt?: ReturnType<typeof useTranslations>,
) =>
  z.object({
    name: z
      .string()
      .min(1, vt?.('required', { field: ft?.('fields.name') ?? 'Name' }))
      .max(100, vt?.('too_long', { field: ft?.('fields.name') ?? 'Name', max: 100 })),
    email: z
      .string()
      .min(1, vt?.('required', { field: ft?.('fields.email') ?? 'Email' }))
      .max(100, vt?.('too_long', { field: ft?.('fields.email') ?? 'Email', max: 100 }))
      .email(vt?.('email_invalid')),
    message: z
      .string()
      .min(1, vt?.('required', { field: ft?.('fields.message') ?? 'Message' }))
      .max(1000, vt?.('too_long', { field: ft?.('fields.message') ?? 'Message', max: 1000 })),
  });
