import type { Metadata } from "next";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapClient from "../components/Bootstrap/BootstrapClient";

export const metadata: Metadata = {
  title: "Hackathon",  // Título da guia
  description: "Projeto Hackathon",  // Descrição
  icons: {
    icon: "/icons/favicon.ico",  // Caminho para o novo ícone
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={'flex items-start'}>
          <main className="grid w-full h-full">
            {children}
          </main>
        <BootstrapClient />
      </body>
    </html>
  );
}