import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/json-ld";
import { Container } from "@/components/ui/Container";
import { ROUTES, CONTACT_EMAIL, SITE_URL } from "@/lib/tokens";
import { localePath } from "@/lib/utils";

/* ── Metadata ── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return createMetadata({
    title: `${dict.legalPrivacy.title} | Guana`,
    description:
      locale === "es"
        ? "Politica de privacidad de Guana. Cómo recopilamos, usamos y protegemos tu información."
        : "Guana privacy policy. How we collect, use, and protect your information.",
    path: ROUTES.privacy,
    locale: locale as Locale,
  });
}

/* ── Page ── */

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const { legalPrivacy, common } = dict;

  const breadcrumbs = breadcrumbSchema([
    { name: common.home, url: `${SITE_URL}${localePath(ROUTES.home, locale)}` },
    { name: "Legal", url: `${SITE_URL}${localePath(ROUTES.privacy, locale)}` },
    {
      name: legalPrivacy.title,
      url: `${SITE_URL}${localePath(ROUTES.privacy, locale)}`,
    },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      {/* Hero */}
      <section className="bg-cream-light py-20 md:py-28">
        <Container size="narrow">
          <div className="text-center">
            <h1 className="text-display-lg md:text-display-xl font-bold text-deep tracking-tight">
              {legalPrivacy.title}
            </h1>
            <p className="mt-4 text-lg text-deep/60">{legalPrivacy.lastUpdated}</p>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-20 md:py-28">
        <Container size="narrow">
          <div className="max-w-3xl mx-auto space-y-16 text-base md:text-lg leading-relaxed text-deep/60">
            <p className="rounded-2xl border border-sunset/20 bg-sunset/5 p-5 text-sm text-sunset-dark">
              This is a summary of our privacy practices. Full legal review
              pending. For questions, contact{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium underline"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>

            {/* 1. Information Collection */}
            <div>
              <h2 className="text-display-sm md:text-display-md font-bold text-deep tracking-tight">
                1. Information Collection
              </h2>
              <p className="mt-6">
                When you create a Guana account, we collect personal information
                that you provide directly, including your name, email address,
                profile photo, and travel preferences. If you choose to verify
                your identity, we may collect a copy of your government-issued
                identification document.
              </p>
              <p className="mt-4">
                When you use the app, we automatically collect certain
                information such as device type, operating system version, app
                version, IP address, and general location data. When you publish
                or join a trip, we collect trip details including origin,
                destination, route, date, time, and pricing.
              </p>
              <p className="mt-4">
                If you enable live tracking during a trip, your real-time
                location is shared with trip participants for the duration of the
                trip only. Location data from completed trips is not retained
                beyond what is needed for trip records.
              </p>
            </div>

            {/* 2. Use of Information */}
            <div>
              <h2 className="text-display-sm md:text-display-md font-bold text-deep tracking-tight">
                2. Use of Information
              </h2>
              <p className="mt-6">
                We use the information we collect to operate, maintain, and
                improve the Guana platform. This includes matching passengers
                with drivers, facilitating in-app messaging, displaying
                profiles and trip details, processing identity and vehicle
                verifications, and sending trip-related notifications.
              </p>
              <p className="mt-4">
                We may use aggregated, anonymized data to analyze usage trends,
                improve our search and matching algorithms, and understand
                popular routes and travel patterns across Costa Rica.
              </p>
            </div>

            {/* 3. Data Sharing */}
            <div>
              <h2 className="text-display-sm md:text-display-md font-bold text-deep tracking-tight">
                3. Data Sharing
              </h2>
              <p className="mt-6">
                Your profile information (name, photo, verification status,
                ratings) is visible to other Guana users when you publish a trip
                or book a seat. Trip details are shared between drivers and
                passengers who are matched on the same trip.
              </p>
              <p className="mt-4">
                We do not sell your personal information to third parties. We
                may share data with service providers who assist us in operating
                the platform (such as cloud hosting and push notification
                services), and we may disclose information when required by law
                or to protect the safety of our users.
              </p>
            </div>

            {/* 4. Security */}
            <div>
              <h2 className="text-display-sm md:text-display-md font-bold text-deep tracking-tight">
                4. Security
              </h2>
              <p className="mt-6">
                We implement industry-standard security measures to protect your
                data. All network communications use certificate pinning to
                prevent interception. Sensitive data stored on your device is
                encrypted, and authentication tokens are stored securely in the
                device keychain.
              </p>
              <p className="mt-4">
                While we strive to protect your personal information, no method
                of electronic transmission or storage is completely secure. We
                encourage you to use strong, unique passwords and to keep your
                device software up to date.
              </p>
            </div>

            {/* 5. Your Rights */}
            <div>
              <h2 className="text-display-sm md:text-display-md font-bold text-deep tracking-tight">
                5. Your Rights
              </h2>
              <p className="mt-6">
                You have the right to access, correct, or delete your personal
                information at any time. You can update your profile details
                directly in the app. To request account deletion, use the option
                in your app settings or contact our support team.
              </p>
              <p className="mt-4">
                You may opt out of non-essential notifications through the app
                settings. Please note that transactional notifications related
                to active trips cannot be disabled for safety reasons.
              </p>
            </div>

            {/* 6. Contact */}
            <div>
              <h2 className="text-display-sm md:text-display-md font-bold text-deep tracking-tight">
                6. Contact
              </h2>
              <p className="mt-6">
                If you have questions about this privacy policy or how we handle
                your data, please contact us at{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-medium text-teal hover:text-teal-600 underline transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
