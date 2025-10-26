import { auth } from "@/auth";
import MyAccount from "@/components/my-account";
import { checkUser } from "../queries/auth";

export const metadata = {
  title: "My Account | Windermere Lodges",
  description:
    "Manage your bookings, preferences, and personal details securely at Windermere Lodges.",
    
  openGraph: {
    title: "My Account | Windermere Lodges",
    description:
      "Access your personal dashboard to view and manage your bookings at Windermere Lodges — luxury lodges in the heart of the Lake District.",
    url: "https://windermerelodges.co.uk/my-account",
    images: [
      {
        url: "https://windermerelodges.co.uk/og-image-my-account.jpg",
        width: 1200,
        height: 630,
        alt: "My Account Dashboard at Windermere Lodges",
      },
    ],
  },
  alternates: {
    canonical: "https://windermerelodges.co.uk/my-account",
  },
};


export default async function MyAccountPage() {
  const session = await auth();

  const user = await checkUser({email:session?.user?.email});

  
  return <MyAccount user={user} />;
}
