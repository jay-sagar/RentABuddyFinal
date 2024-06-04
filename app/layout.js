import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { Toaster } from "sonner";
import { ThemeProvider } from "../components/theme-provider";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Rent A Buddy",
  description: "A platform to run buddies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="md:px-20">
            <Header />
            {children}
            <Toaster />
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
