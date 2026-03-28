import ContactConfirmationEmailTemplate from '@/components/email/contact-confirmation-email-template';
import NewMessageNotificationEmailTemplate from '@/components/email/new-message-notification-email-template';
import { createRateLimiter } from '@/lib/ratelimit';
import { resend } from '@/lib/resend';
import { contactFormSchema } from '@/lib/validation_schemas/contact-schemas';
import { Locale } from '@/types/locale';
import { render } from '@react-email/render';
import { createTranslator } from 'next-intl';
import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
const fromEmail = process.env.EMAIL_FROM || '';
const ratelimit = createRateLimiter(5, '1 m', '/api/send-email');

export async function POST(req: NextRequest) {
  try {
    const ip = (req.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];
    const ratelimitResult = await ratelimit.limit(ip);
    if (!ratelimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.', error_code: 99 },
        { status: 429 },
      );
    }

    const body = await req.json();
    const validatedData = contactFormSchema().safeParse(body);
    if (!validatedData.success) {
      return NextResponse.json({ error: 'Invalid input', error_code: 1000 }, { status: 400 });
    }
    const { name, email, message } = validatedData.data;

    const currentLocale = body.locale in Locale ? body.locale : Locale.EN;
    const t = createTranslator({
      messages: await import(`../../../../messages/${currentLocale}.json`),
      namespace: 'EmailTemplate',
      locale: currentLocale,
    });

    // To the site owner
    const notificationEmailHtml = await render(
      NewMessageNotificationEmailTemplate({ name, email, message, locale: currentLocale }),
    );
    const { data: notificationResponseData, error: notificationError } = await resend.emails.send({
      from: fromEmail,
      to: [fromEmail],
      subject: t('NewMessageNotification.subject', { name }),
      html: notificationEmailHtml,
      headers: {
        'X-Entity-Ref-ID': `<${randomUUID()}@${process.env.APP_URL || 'localhost'}>`,
      },
    });
    if (notificationError) {
      console.error('Resend error:', notificationError);
      return NextResponse.json(
        { error: 'Failed to send email', error_code: 1001 },
        { status: 500 },
      );
    }

    // To the sender
    const confirmationEmailHtml = await render(
      ContactConfirmationEmailTemplate({ name, email, message, locale: currentLocale }),
    );
    const { data: confirmationResponseData, error: confirmationError } = await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: t('ContactConfirmation.subject', { name }),
      html: confirmationEmailHtml,
      headers: {
        'X-Entity-Ref-ID': `<${randomUUID()}@${process.env.APP_URL || 'localhost'}>`,
      },
    });
    if (confirmationError) {
      console.error('Resend error:', confirmationError);
      return NextResponse.json(
        { error: 'Failed to send email', error_code: 1002 },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data: confirmationResponseData });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('POST /api/send-email error:', errorMessage);
    return NextResponse.json({ error: 'Server error', error_code: 9999 }, { status: 500 });
  }
}
