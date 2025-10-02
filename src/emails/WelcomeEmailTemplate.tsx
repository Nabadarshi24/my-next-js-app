import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
  Link,
} from '@react-email/components';

interface WelcomeEmailProps {
  username: string;
  loginUrl: string;
}

export default function WelcomeEmailTemplate({ username, loginUrl }: WelcomeEmailProps) {

  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Welcome to our platform</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      {/* <Preview>Here&apos;s your verification code: {otp}</Preview> */}
      <Section>
        <Row>
          <Heading as="h2">Hello {username},</Heading>
        </Row>
        <Row>
          <Text>
            Thank you for registering. Please use the following link to set your password:
          </Text>
        </Row>
        <Row>
          <Text><Link href={loginUrl}>{loginUrl}</Link></Text>
        </Row>
        <Row>
          <Text>
            If you did not request this code, please ignore this email.
          </Text>
        </Row>
        {/* <Row>
              <Button
                href={`http://localhost:3000/verify/${username}`}
                style={{ color: '#61dafb' }}
              >
                Verify here
              </Button>
            </Row> */}
      </Section>
    </Html>
  );
};
