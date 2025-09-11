import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Get in touch with our friendly team</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-teal-600 mt-1 mr-3" />
            <div>
              <h4 className="font-medium">Our Address</h4>
              <p className="text-gray-600 mt-1">
                Windermere Lodges,
                <br />
                Bartle Houese,
                <br />
                Oxford Court,
                <br />
                Manchester, England
              </p>
              <Button variant="link" className="text-teal-600 h-auto p-0 mt-1">
                View on map
              </Button>
            </div>
          </div>

          {/* <div className="flex items-start">
            <Phone className="h-5 w-5 text-teal-600 mt-1 mr-3" />
            <div>
              <h4 className="font-medium">Phone</h4>
              <p className="text-gray-600 mt-1">
                <a href="tel:+441539123456" className="hover:text-teal-600">
                  +44 (0) 1539 123 456
                </a>
              </p>
              <p className="text-sm text-gray-500 mt-1">For bookings and general inquiries</p>
            </div>
          </div> */}

          <div className="flex items-start">
            <Mail className="h-5 w-5 text-teal-600 mt-1 mr-3" />
            <div>
              <h4 className="font-medium">Email</h4>
              <p className="text-gray-600 mt-1">
                <a href="mailto:info@windermerelodges.com" className="hover:text-teal-600">
                  info@lodgelets.co.uk
                </a>
              </p>
              <p className="text-sm text-gray-500 mt-1">We aim to respond within 24 hours</p>
            </div>
          </div>

          <div className="flex items-start">
            <Clock className="h-5 w-5 text-teal-600 mt-1 mr-3" />
            <div>
              <h4 className="font-medium">Operating Hours</h4>
              <div className="text-gray-600 mt-1 space-y-1">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed (Emergency contact only)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Connect With Us</CardTitle>
          <CardDescription>Follow us on social media for updates and special offers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <a href="#" className="bg-gray-100 hover:bg-teal-100 text-teal-600 p-3 rounded-full transition-colors">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="bg-gray-100 hover:bg-teal-100 text-teal-600 p-3 rounded-full transition-colors">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="bg-gray-100 hover:bg-teal-100 text-teal-600 p-3 rounded-full transition-colors">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className="bg-gray-100 hover:bg-teal-100 text-teal-600 p-3 rounded-full transition-colors">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

