'use client';
import { Spinner } from '@/components/ui/spinner';
import { useTranslations } from 'next-intl';

interface ResultDisplayProps {
  data?: unknown;
  error?: string | null;
  loading?: boolean;
}

export function ResultDisplay({ data, error, loading }: ResultDisplayProps) {
  const t = useTranslations('FormStatus');
  if (loading) {
    return (
      <div className="mt-6 p-4 rounded-lg border border-border bg-muted flex items-center">
        <Spinner /> <span className="ml-2 text-sm text-muted-foreground">{t('sending')}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 p-4 rounded-lg border border-red-200 bg-red-50">
        <h3 className="font-medium text-red-800 mb-2">{t('error')}</h3>
        <p className="text-sm text-red-700">{error}</p>
      </div>
    );
  }

  if (data) {
    return (
      <div className="mt-6 p-4 rounded-lg border border-green-200 bg-green-50">
        <h3 className="font-medium text-green-800 mb-2">{t('success')}</h3>
      </div>
    );
  }

  return null;
}
