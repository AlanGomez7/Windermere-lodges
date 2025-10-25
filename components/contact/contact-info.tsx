import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Clock, Facebook } from "lucide-react";
import Link from "next/link";

export function ContactInfo() {
  return (
    <div className="space-y-6">
      {/* Contact Information Card */}
      <section aria-labelledby="contact-information">
        <Card aria-labelledby="contact-information">
          <CardHeader className="items-start text-left">
            <CardTitle>
              <h2
                id="contact-information"
                className="text-2xl font-semibold text-gray-900"
              >
                Contact Information
              </h2>
            </CardTitle>
            <CardDescription>
              Get in touch with our friendly team
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Address */}
            <div className="flex items-start">
              <MapPin
                className="h-5 w-5 text-teal-600 mt-1 mr-3"
                aria-hidden="true"
              />
              <div>
                <h3 className="font-medium text-xl text-gray-900">
                  Our Address
                </h3>
                <p className="text-gray-800 mt-1 leading-relaxed">
                  Windermere Lodges,
                  <br />
                  Bartle House,
                  <br />
                  Oxford Court,
                  <br />
                  Manchester, England
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start">
              <Mail
                className="h-5 w-5 text-teal-600 mt-1 mr-3"
                aria-hidden="true"
              />
              <div>
                <h3 className="font-medium text-xl text-gray-900">Email</h3>
                <p className="text-gray-800 mt-1">
                  <Link
                    href="mailto:info@lodgelets.co.uk"
                    className="hover:text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600 rounded"
                    aria-label="Send email to info@lodgelets.co.uk"
                  >
                    info@lodgelets.co.uk
                  </Link>
                </p>
                <p className="text-gray-700 text-sm mt-1">
                  We aim to respond within 24 hours
                </p>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="flex items-start">
              <Clock
                className="h-5 w-5 text-teal-600 mt-1 mr-3"
                aria-hidden="true"
              />
              <div>
                <h3 className="font-medium text-xl text-gray-900">
                  Operating Hours
                </h3>
                <div className="text-gray-800 mt-1 space-y-1 leading-relaxed">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed (Emergency contact only)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Social Media Card */}
      <section aria-labelledby="social-media">
        <Card aria-labelledby="social-media">
          <CardHeader className="items-start text-left">
            <CardTitle>
              <h2 id="social-media" className="text-xl text-gray-900">
                Connect With Us
              </h2>
            </CardTitle>
            <CardDescription>
              Follow us on social media for updates and special offers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/windermerelodges"
                target="_blank"
                className="bg-gray-100 hover:bg-teal-100 text-teal-600 p-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-600"
                aria-label="Visit our Facebook page"
              >
                <Facebook className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
