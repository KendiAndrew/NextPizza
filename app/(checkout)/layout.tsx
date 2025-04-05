import { Container, Header } from "@/shared/components/shared";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Pizza | Кошик",
  description: "Made by next.js",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#f4f1ee]">
      <Container>
        <Header
          className="border-b-gray-200"
          hasSearch={false}
          hasCart={false}
        />
        {children}
      </Container>
    </main>
  );
}
