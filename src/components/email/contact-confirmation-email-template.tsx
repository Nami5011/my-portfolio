import { Locale } from '@/types/locale';
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import type { TailwindConfig } from '@react-email/components';
import { createTranslator } from 'next-intl';

const emailTailwindConfig = {
  darkMode: ['selector', '[data-mode="dark"]'],
} satisfies TailwindConfig;

const baseUrl = process.env.APP_URL ? `https://${process.env.APP_URL}` : '';

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
  locale: Locale;
}

export default async function ContactConfirmationEmailTemplate({
  name,
  email,
  message,
  locale = Locale.EN,
}: EmailTemplateProps) {
  if (!(locale in Locale)) {
    locale = Locale.EN;
  }
  const t = createTranslator({
    messages: await import(`../../../messages/${locale}.json`),
    namespace: 'EmailTemplate.ContactConfirmation',
    locale,
  });

  return (
    <Html>
      <Head />
      <Tailwind config={emailTailwindConfig}>
        <Body className="bg-[#f6f9fc] font-stripe">
          <Preview>{t('greeting', { name })}</Preview>
          <Container className="bg-white mx-auto py-5 pb-12 mb-16">
            <Section className="px-12">
              <Img
                src={`${baseUrl}/images/email/logo.jpg`}
                width="100"
                height="32"
                alt="Nami Sawada"
              />
              <Hr className="border-[#e6ebf1] my-5" />

              <Text className="text-[#525f7f] text-base leading-6 text-left">{t('body')}</Text>
              <Text className="text-[#525f7f] text-base leading-6 text-left">{t('closing')}</Text>

              <Hr className="border-[#e6ebf1] my-5" />
              <Text className="text-[#525f7f] text-base leading-6 text-left">
                {t('name')}:
                <br />
                {name}
              </Text>
              <Text className="text-[#525f7f] text-base leading-6 text-left">
                {t('email')}:
                <br />
                {email}
              </Text>
              <Text className="text-[#525f7f] text-base leading-6 text-left">
                {t('message')}:
                <br />
                {message}
              </Text>

              <Hr className="border-[#e6ebf1] my-5" />
              <Text className="text-[#8898aa] text-xs leading-4">{t('site_name')}</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
