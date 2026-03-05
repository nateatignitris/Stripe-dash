import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Stripe Dashboard Replica",
    description: "Pixel-perfect Stripe dashboard replica for portfolio demonstrations.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased bg-stripe-bg">
                {children}
            </body>
        </html>
    );
}
