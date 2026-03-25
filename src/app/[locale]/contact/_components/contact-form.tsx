'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupTextarea } from '@/components/ui/input-group';
import { useLocale, useTranslations } from 'next-intl';
import { ResultDisplay } from '@/components/ui/shared/messages/result-display';
import { contactFormSchema } from '@/lib/validation_schemas/contact-schemas';

export function ContactForm() {
  const locale = useLocale();
  const t = useTranslations('ContactPage');
  const vt = useTranslations('FormValidation');
  const formSchema = contactFormSchema(t, vt);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<{
    data?: unknown;
    error?: string;
  } | null>(null);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, locale }),
      });
      const result = await response.json();
      setResult(result);
      if (response.ok) {
        setResult({ data: result });
        form.reset();
      } else {
        toast.error(result.error || t('form.submission_error'));
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(t('form.submission_error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full sm:max-w-md shadow-md">
      <CardContent>
        <form id="form-contact" onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-name">{t('fields.name')}</FieldLabel>
                  <Input
                    {...field}
                    id="form-name"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
                    maxLength={100}
                    autoComplete="on"
                    disabled={loading}
                  />
                  {fieldState.invalid && (
                    <FieldError className="text-xs" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-email">{t('fields.email')}</FieldLabel>
                  <Input
                    {...field}
                    id="form-email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
                    maxLength={100}
                    autoComplete="email"
                    disabled={loading}
                  />
                  {fieldState.invalid && (
                    <FieldError className="text-xs" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="message"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-message">{t('fields.message')}</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-message"
                      placeholder=""
                      rows={8}
                      maxLength={1000}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                      disabled={loading}
                    />
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError className="text-xs" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="vertical">
          <Button
            type="submit"
            form="form-contact"
            disabled={loading}
            className="py-5.5 w-full cursor-pointer bg-primary hover:bg-primary-hover"
          >
            {t('form.send')}
          </Button>
          <ResultDisplay data={result?.data} error={result?.error} loading={loading} />
        </Field>
      </CardFooter>
    </Card>
  );
}
