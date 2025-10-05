import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import NewsLetter from "./newletter-subscription";
import { auth } from "@/auth";

const Footer = async() => {

  const session = await auth();
  
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Windermere Lodges</h3>
            <p className="text-gray-300 mb-4">
              Luxury lodges in the heart of the Lake District, offering
              unforgettable experiences in one of England's most beautiful
              landscapes.
            </p>
            {/* <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">
                <Instagram size={20} />
              </a>
            </div> */}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/our-lodges"
                  className="text-gray-300 hover:text-emerald-400 transition-colors"
                >
                  Our Lodges
                </Link>
              </li>
              {/* <li>
                <Link href="/amenities" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  Amenities
                </Link>
              </li> */}
              <li>
                <Link
                  href="/activities"
                  className="text-gray-300 hover:text-emerald-400 transition-colors"
                >
                  Activities
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-gray-300 hover:text-emerald-400 transition-colors"
                >
                  Gallery
                </Link>
              </li>
              {/* <li>
                <Link href="/itinerary-planner" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  Itinerary Planner
                </Link>
              </li> */}
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-emerald-400 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  Windermere Lodges, Bartle House, Oxford Court, Manchester,
                  England
                </span>
              </li>
              {/* <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-emerald-400" />
                <span className="text-gray-300">+44 (0) 1539 123456</span>
              </li> */}
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-emerald-400" />
                <span className="text-gray-300">info@lodgelets.co.uk</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <NewsLetter name={session?.user?.name || ""} email={session?.user?.email || ""}/>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Windermere Lodges. All rights
              reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy-policy"
                className="text-gray-400 hover:text-emerald-400 text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-gray-400 hover:text-emerald-400 text-sm"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookie-policy"
                className="text-gray-400 hover:text-emerald-400 text-sm"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
