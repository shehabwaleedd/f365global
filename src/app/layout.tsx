import SmoothScrolling from "../animation/SmoothScrolling";
import "./globals.css";
import Navbar from "../components/navbar/Navbar";
import dynamic from "next/dynamic";
const Footer = dynamic(() => import("../components/footer"), { ssr: false });
import { AuthProvider } from "../context/AuthContext";
import { AnimationProvider } from "../context/AnimationContext";

export const viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: "yes",
  viewportFit: "cover",
  themeColor: "var(--background-color)",
}

export function generateMetadata() {
  return {
    title: "F365 Global",
    description: "F365 Global is a creative agency in Dubai, specializing in wellness and career coaching for young influencers and entrepreneurs. We offer a range of services to help you achieve your goals.",
    url: "https://f365-global.com",
    openGraph: {
      type: "website",
      title: "F365 Global",
      description: "F365 Global is a creative agency in Dubai, specializing in wellness and career coaching for young influencers and entrepreneurs. We offer a range of services to help you achieve your goals.",
      images: "https://f365-global/images/landing.jpg",
      url: "https://f365-global.com",
      site_name: "F365 Global",
    },
    twitter: {
      title: "F365 Global",
      description: "F365 Global is a creative agency in Dubai, specializing in wellness and career coaching for young influencers and entrepreneurs. We offer a range of services to help you achieve your goals.",
      images: "https://f365-global/images/landing.jpg",
      cardType: 'summary_large_image',
    },

    keywords: [
      "Global",
      "Dubai",
      "Global Dubai",
      "wellness",
      "career coaching",
      "wellness coaching",
      "career coaching",
      "wellness coaching Dubai",
      "career coaching Dubai",
      "wellness coaching UAE",
      "career coaching UAE",
      "wellness coaching Middle East",
      "career coaching Middle East",
      "wellness coaching influencers",
      "career coaching influencers",
      "wellness coaching entrepreneurs",
      "career coaching entrepreneurs",
      "wellness coaching young influencers",
      "career coaching young influencers",
      "wellness coaching young entrepreneurs",
      "career coaching young entrepreneurs",
      "wellness coaching wellness brands",
    ],
  }

}

export default function RootLayout({ children }: { children: JSX.Element | JSX.Element[] }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="App" >
        <AuthProvider>
          <AnimationProvider>
            <Navbar />
            <SmoothScrolling>
              {children}
            </SmoothScrolling>
            <Footer />
          </AnimationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
