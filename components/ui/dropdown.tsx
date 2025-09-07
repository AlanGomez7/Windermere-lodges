import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import LogoutButton from "../logout-button";
import { useEffect, useState } from "react";
import { UserRound, BookCheck, Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DropDown({
  user,
  isMobile,
}: {
  user: any;
  isMobile: boolean;
}) {
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isMobile ? (
          <Button variant={"ghost"}>
            <Avatar className="w-10 h-10 hover:shadow-md transition-all duration-150 shadow-md">
              <AvatarImage
                src={user?.avatar || "/placeholder.svg?height=40&width=40"}
              />
              <AvatarFallback
                className={`bg-gradient-to-br from-teal-100 to-teal-200 text-teal-700 font-semibold`}
              >
                {user ? getInitials(user.name || "User") : "U"}
              </AvatarFallback>
            </Avatar>
            {user.name}
          </Button>
        ) : (
          <Button
            variant="ghost"
            //   className="relative h-auto px-3 rounded-full flex items-center gap-3 hover:bg-gray-100 transition-all duration-150"
            className={`relative h-auto px-3 rounded-full flex items-center gap-3 hover:bg-gray-100 transition-all duration-150 ${cn(
              isScrolled
                ? "text-gray-700 hover:text-emerald-600"
                : "text-white hover:text-emerald-300"
            )}`}
          >
            <Avatar className="w-10 h-10 hover:shadow-md transition-all duration-150 shadow-md">
              <AvatarImage
                src={user?.image || "/placeholder.svg?height=40&width=40"}
              />
              <AvatarFallback
                className={`bg-gradient-to-br from-teal-100 to-teal-200 text-teal-700 font-semibold`}
              >
                {user ? getInitials(user.name || "User") : "U"}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block text-left">
              <p>{user?.name || "User"}</p>
            </div>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align="start"
        side={isMobile ? "top" : "left"}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/account">
            <UserRound className="mr-4 my-2"/>
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/my-bookings">
            <BookCheck className="mr-4 my-2"/>
            Bookings
          </Link>
        </DropdownMenuItem>
        {/* <DropdownMenuItem asChild>
          <Link href="/favorites">
            <Heart className="mr-4 my-2"/>
            Favorites
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/reviews-and-ratings">
            <Star className="mr-4 my-2"/>
            Reviews & Ratings
          </Link>
        </DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div className="w-full">
            <LogoutButton />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
