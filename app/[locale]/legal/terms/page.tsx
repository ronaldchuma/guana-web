import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/json-ld";
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
    title: `${dict.legalTerms.title} | Guana`,
    description:
      locale === "es"
        ? "Términos de servicio de Guana. Condiciones de uso de la plataforma."
        : "Guana terms of service. Conditions for using the platform.",
    path: ROUTES.terms,
    locale: locale as Locale,
  });
}

/* ── Page ── */

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const { legalTerms, common } = dict;

  const breadcrumbs = breadcrumbSchema([
    { name: common.home, url: `${SITE_URL}${localePath(ROUTES.home, locale)}` },
    { name: "Legal", url: `${SITE_URL}${localePath(ROUTES.terms, locale)}` },
    {
      name: legalTerms.title,
      url: `${SITE_URL}${localePath(ROUTES.terms, locale)}`,
    },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      {/* Hero */}
      <section className="pt-[120px] sm:pt-[140px] pb-14 md:pb-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-[100px] flex flex-col items-center text-center gap-[10px]">
          <h1
            className="font-sans font-normal text-black"
            style={{ fontSize: "clamp(2rem, 5vw, 65px)", lineHeight: 1.1 }}
          >
            {legalTerms.title}
          </h1>
          <p className="text-[18px] font-sans font-normal text-black/50 leading-[1.2]">
            {legalTerms.lastUpdated}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-28 md:pb-36">
        <div className="max-w-[800px] mx-auto px-6 lg:px-[100px] flex flex-col gap-14">
          <p className="rounded-[10px] border border-black/10 bg-black/[0.03] p-5 text-[16px] font-sans font-normal text-black/60 leading-[1.4]">
            This is a summary of our terms of service. Full legal review
            pending. For questions, contact{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium underline"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>

          {/* 1. Acceptance */}
          <div className="flex flex-col gap-4">
            <h2
              className="font-sans font-normal text-black"
              style={{ fontSize: "clamp(1.5rem, 3vw, 40px)", lineHeight: 1.2 }}
            >
              1. Acceptance of Terms
            </h2>
            <p className="text-[18px] font-sans font-normal text-black leading-[1.4]">
              By downloading, accessing, or using the Guana mobile application
              or website (collectively, the &quot;Platform&quot;), you agree to
              be bound by these Terms of Service. If you do not agree to these
              terms, please do not use the Platform.
            </p>
            <p className="text-[18px] font-sans font-normal text-black leading-[1.4]">
              Guana reserves the right to update or modify these terms at any
              time. Continued use of the Platform after changes are posted
              constitutes acceptance of the revised terms. We will notify users
              of material changes through the app or by email.
            </p>
          </div>

          {/* 2. Description of Service */}
          <div className="flex flex-col gap-4">
            <h2
              className="font-sans font-normal text-black"
              style={{ fontSize: "clamp(1.5rem, 3vw, 40px)", lineHeight: 1.2 }}
            >
              2. Description of Service
            </h2>
            <p className="text-[18px] font-sans font-normal text-black leading-[1.4]">
              Guana is a ridesharing platform that connects drivers who are
              already traveling between destinations in Costa Rica with
              passengers seeking rides along similar routes. Guana facilitates
              cost-sharing between drivers and passengers; it is not a
              transportation company, taxi service, or common carrier.
            </p>
            <p className="text-[18px] font-sans font-normal text-black leading-[1.4]">
              Drivers set their own per-seat prices to offset travel expenses
              such as fuel and tolls. Guana does not employ drivers, set
              fares, or control the routes, schedules, or conduct of any user.
            </p>
          </div>

          {/* 3. User Accounts */}
          <div className="flex flex-col gap-4">
            <h2
              className="font-sans font-normal text-black"
              style={{ fontSize: "clamp(1.5rem, 3vw, 40px)", lineHeight: 1.2 }}
            >
              3. User Accounts
            </h2>
            <p className="text-[18px] font-sans font-normal text-black leading-[1.4]">
              To use Guana, you must create an account by providing accurate
              and complete information. You are responsible for maintaining the
              security of your account credentials and for all activity that
              occurs under your account.
            </p>
            <p className="text-[18px] font-sans font-normal text-black leading-[1.4]">
              You must be at least 18 years of age to create an account.
              Drivers must hold a valid driver&apos;s license and appropriate
              vehicle insurance for their jurisdiction. Providing false or
              misleading information may result in account suspension or
              termination.
            </p>
          </div>

          {/* 4. User Conduct */}
          <div className="flex flex-col gap-4">
            <h2
              className="font-sans font-normal text-black"
              style={{ fontSize: "clamp(1.5rem, 3vw, 40px)", lineHeight: 1.2 }}
            >
              4. User Conduct
            </h2>
            <p className="text-[18px] font-sans font-normal text-black leading-[1.4]">
              All users agree to treat fellow travelers with respect and
              courtesy. You must not use the Platform to engage in any illegal
              activity, discriminate against other users, harass or threaten
              others, or misrepresent your identity.
            </p>
            <p className="text-[18px] font-sans font-normal text-black leading-[1.4]">
              Drivers agree to operate their vehicle safely and in compliance
              with all applicable traffic laws. Passengers agree to arrive
              punctually at the agreed pickup location and to behave
              respectfully during the trip.
            </p>
            <p className="text-[18px] font-sans font-normal text-black leading-[1.4]">
              Guana reserves the right to suspend or terminate accounts that
              violate these conduct standards, based on reports from other
              users or our own review.
            </p>
          </div>

          {/* 5. Trips and Payments */}
          <div className="flex flex-col gap-4">
            <h2
              className="font-sans font-normal text-black"
              style={{ fontSize: "clamp(1.5rem, 3vw, 40px)", lineHeight: 1.2 }}
            >
              5. Trips and Payments
            </h2>
            <p className="text-[18px] font-sans font-normal text-black leading-[1.4]">
              Drivers publish trip details including route, date, time,
              available seats, and per-seat price. Passengers browse and book
              available trips through the Platform. Both parties can
              communicate through in-app messaging to coordinate details.
            </p>
            <p className="text-[18px] font-sans font-normal text-black leading-[1.4]">
              The per-seat price is a cost-sharing contribution set by the
              driver. It is intended to offset the driver&apos;s travel
              expenses and should not exceed the actual costs of the trip
              divided among all occupants. Payment arrangements are between the
              driver and passenger.
            </p>
            <p className="text-[18px] font-sans font-normal text-black leading-[1.4]">
              Either party may cancel a trip through the Platform. We
              encourage cancellations to be made as early as possible to
              minimize inconvenience. Repeated cancellations may affect your
              account standing and visibility on the Platform.
            </p>
          </div>

          {/* 6. Limitation of Liability */}
          <div className="flex flex-col gap-4">
            <h2
              className="font-sans font-normal text-black"
              style={{ fontSize: "clamp(1.5rem, 3vw, 40px)", lineHeight: 1.2 }}
            >
              6. Limitation of Liability
            </h2>
            <p className="text-[18px] font-sans font-normal text-black leading-[1.4]">
              Guana provides a platform for connecting users and does not
              guarantee the availability, quality, safety, or legality of any
              trip. Guana is not responsible for the actions, conduct, or
              negligence of any user.
            </p>
            <p className="text-[18px] font-sans font-normal text-black leading-[1.4]">
              To the fullest extent permitted by applicable law, Guana shall
              not be liable for any indirect, incidental, special,
              consequential, or punitive damages arising from or related to
              your use of the Platform or any trip arranged through it.
            </p>
            <p className="text-[18px] font-sans font-normal text-black leading-[1.4]">
              Users acknowledge that ridesharing involves inherent risks
              associated with motor vehicle travel. By using the Platform, you
              assume these risks voluntarily.
            </p>
          </div>

          {/* 7. Changes to Terms */}
          <div className="flex flex-col gap-4">
            <h2
              className="font-sans font-normal text-black"
              style={{ fontSize: "clamp(1.5rem, 3vw, 40px)", lineHeight: 1.2 }}
            >
              7. Changes to Terms
            </h2>
            <p className="text-[18px] font-sans font-normal text-black leading-[1.4]">
              We may revise these Terms of Service from time to time. The most
              current version will always be available on the Platform. If a
              revision is material, we will provide at least 30 days notice
              before the new terms take effect.
            </p>
            <p className="text-[18px] font-sans font-normal text-black leading-[1.4]">
              Your continued use of Guana after the effective date of any
              changes constitutes your acceptance of the updated terms.
            </p>
          </div>

          {/* 8. Contact */}
          <div className="flex flex-col gap-4">
            <h2
              className="font-sans font-normal text-black"
              style={{ fontSize: "clamp(1.5rem, 3vw, 40px)", lineHeight: 1.2 }}
            >
              8. Contact
            </h2>
            <p className="text-[18px] font-sans font-normal text-black leading-[1.4]">
              If you have questions about these terms, please contact us at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium underline hover:text-black/60 transition-colors"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
