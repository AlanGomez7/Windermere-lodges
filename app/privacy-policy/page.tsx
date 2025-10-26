import { PageHeader } from "@/components/page-header";
import { Footer } from "react-day-picker";

export const metadata = {
  title: "Privacy Policy | Windermere Lodges",
  description:
    "Read Windermere Lodges' privacy policy to understand how we collect, use, and protect your personal information while you enjoy our luxury lodges.",
    
  openGraph: {
    title: "Privacy Policy | Windermere Lodges",
    description:
      "Learn about how Windermere Lodges manages your personal data securely and responsibly, ensuring your privacy while booking and staying with us.",
    url: "https://windermerelodges.co.uk/privacy-policy",
    images: [
      {
        url: "https://windermerelodges.co.uk/og-image-privacy-policy.jpg",
        width: 1200,
        height: 630,
        alt: "Privacy Policy at Windermere Lodges",
      },
    ],
  },
  alternates: {
    canonical: "https://windermerelodges.co.uk/privacy-policy",
  },
};


export default function PrivacyPolicies() {
  type Booking = {
    title: string;
    summary: string[];
    extra?: string;
  };

  const sampleData: Booking[] = [
    {
      title: "Personal Information You Provide",
      summary: [
        "Full name and contact details (email address, phone number, postal address)",
        "Payment and billing information (credit/debit card details, billing address)",
        "Booking details (check-in/check-out dates, number of guests, special requirements)",
        "Identification documents (as required for verification purposes)",
        "Communication preferences and marketing consent",
        "Any information you provide when contacting our customer service team",
      ],
    },
    {
      title: "Information Automatically Collected",
      summary: [
        "Device and browser information (IP address, browser type, operating system)",
        "Usage data (pages visited, time spent on site, clickstream data)",
        "Cookies and similar tracking technologies (see our Cookie Policy below)",
        "Location data (general geographic location based on IP address)",
      ],
    },
    {
      title: "How We Use Your Information",
      summary: [
        "Process and manage your lodge bookings and reservations",
        "Send booking confirmations, payment receipts, and pre-arrival information",
        "Communicate with you about your stay and respond to inquiries",
        "Process payments and prevent fraudulent transactions",
        "Obtain reviews and feedback on your visit",
        "Improve our website, services, and customer experience",
        "Contact you specifically about returning as a guest in the future",
        "Include you in our general marketing communications (only with your consent)",
        "Comply with legal obligations and resolve disputes",
        "Analyse website usage and improve our offerings",
      ],
    },
    {
      title: "Legal Basis for Processing (UK GDPR)",
      summary: [
        "Contract Performance: To fulfil our booking agreement with you",
        "Legitimate Interests: To improve our services and prevent fraud",
        "Legal Obligation: To comply with tax, accounting, and legal requirements",
        "Consent: For marketing communications and non-essential cookies",
      ],
    },
    {
      title: "Sharing Your Information",
      summary: [
        "White Cross Bay Holiday Park: To facilitate your accommodation and access to park facilities, or contact you in the event of any issues affecting access to the lodge or your stay",
        "Our Cleaning Contractors: If they need to contact you in relation to forgotten property, or discuss any accessibility requirements",
        "Payment Processors: To securely process your payments",
        "Service Providers: Third-party companies that help us operate our business (email services, website hosting, customer support)",
        "Legal Authorities: When required by law or to protect our rights",
        "Business Transfers: In the event of a merger, sale, or transfer of business assets",
      ],
      extra:
        "We do not sell your personal information to third parties for marketing purposes.",
    },
    {
      title: "Data Retention",
      summary: [
        "Fulfil the purposes outlined in this policy",
        "Comply with legal, accounting, and tax requirements (typically 7 years)",
        "Resolve disputes and enforce our agreements",
      ],
      extra:
        "After this period, we will securely delete or anonymise your information.",
    },

    {
      title: "Your Rights",
      summary: [
        "Access: Request a copy of the personal data we hold about you",
        "Rectification: Correct inaccurate or incomplete information",
        "Erasure: Request deletion of your personal data (subject to legal obligations)",
        "Restriction: Limit how we use your data in certain circumstances",
        "Portability: Receive your data in a structured, commonly used format",
        "Object: Opt out of marketing communications and certain data processing",
        "Withdraw Consent: Withdraw consent for processing based on consent",
      ],
      extra:
        "To exercise these rights, please contact us using the details below",
    },
    {
      title: "Cookies and Tracking Technologies",
      summary: [
        "Enable essential website functionality",
        "Remember your preferences and settings",
        "Analyse website traffic and user behaviour",
        "Deliver personalised content and advertisements (with consent)",
      ],
      extra:
        "You can control cookie settings through your browser preferences. Please note that disabling certain cookies may affect website functionality.",
    },
    {
      title: "Security",
      summary: [
        "Secure socket layer (SSL) encryption for data transmission",
        "Secure payment processing through PCI-DSS compliant providers",
        "Regular security assessments and updates",
        "Restricted access to personal data on a need-to-know basis",
      ],
      extra:
        "However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security",
    },
    {
      title: "Third-Party Links",
      summary: [
        "Our website may contain links to third-party websites (such as activity providers or local attractions). We are not responsible for the privacy practices of these websites. We encourage you to review their privacy policies before providing any personal information.",
      ],
    },
    {
      title: "Children's Privacy",
      summary: [
        "Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately.",
      ],
    },
    {
      title: "International Transfers",
      summary: [
        "Standard Contractual Clauses approved by the UK Information Commissioner's Office",
        "Transfers to countries with adequate data protection laws",
        "Other legally approved transfer mechanisms",
      ],
    },
    {
      title: "Changes to This Privacy Policy",
      summary: [
        `We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will post the updated policy on this page with a revised "Last Updated" date. Significant changes will be communicated via email or prominent website notice.`,
      ],
    },
  ];

  
  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title="Privacy Notice"
        description="Last updated: October 2025"
        backgroundImage="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920&auto=format&fit=crop"
      />

      <section className="py-16">
        <div className="container mx-auto px-8 lg:px-52">
          {/* <div className="flex flex-row">

          </div> */}

          <div className=" gap-8">
          <p className="text-7xl py-8">About us</p>

            <p className="font-semibold">
                  Welcome to Windermere Lodges, a brand within Lodge
              Lets Ltd. We are committed to protecting your privacy and ensuring
              the security of your personal information. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you visit our website or book accommodation with
              us. Lodge Lets Ltd is registered with the Information
              Commissioner's Office (ICO), registration number ZB872092, and is
              a member of The Property Redress Scheme, membership number
              PRS050719.
            </p>
          </div>

          <p className="text-5xl py-8">Table of contents</p>

          <div className="w-full py-8">
            {/* Desktop/table view (shows on md+) */}
            <div className="hidden md:block border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-8 text-left text-lg text-black border-r">
                      Key Points
                    </th>
                    <th className="px-4 py-8 text-left text-lg text-black border-r">
                      Summary
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sampleData.map((r, i) => (
                    <tr key={i}>
                      <td className="px-3 py-2 text-md font-semibold text-gray-800 border-r">
                        {r.title}
                      </td>
                      <td className="py-2 px-8 text-gray-800 border-r">
                        {r.summary.map((r, i) => (
                          <li key={i} className="py-2  text-sm font-semibold">
                            {r}
                          </li>
                        ))}
                        {r.extra && <p className="py-4">{r.extra}</p>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile view: horizontal scroll + compact card fallback */}
            <div className="block md:hidden">
              <div className="overflow-x-auto border rounded-md">
                <table className="min-w-[700px] divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-r">
                        Booking
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-r">
                        Guest
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sampleData.map((r, i) => (
                      <tr key={i}>
                        <td className="px-3 py-2 text-md font-semibold text-gray-800 border-r">
                          {r.title}
                        </td>
                        <td className="py-2 px-8 text-md font-semibold text-gray-800 border-r">
                          {r.summary.map((r, i) => (
                            <li key={i} className="py-2">
                              {r}
                            </li>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Optional stacked card fallback for very small screens (uncomment if you prefer cards) */}
              {/* <div className="space-y-3 mt-3">
                {data.map((r) => (
                  <div key={r.id} className="border rounded-md p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-sm font-medium text-gray-800">
                          {r.guest}
                        </div>
                        <div className="text-xs text-gray-500">
                          {r.property}
                        </div>
                      </div>
                      <div className="text-right text-sm">
                        <div className="font-semibold">{r.total}</div>
                        <div className="text-xs text-gray-500">
                          {r.checkIn} → {r.checkOut}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs ${
                          r.status === "Confirmed"
                            ? "bg-emerald-100 text-emerald-700"
                            : r.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {r.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </section>
      <Footer />
      {/* <ChatbotButton /> */}
    </main>
  );
}
