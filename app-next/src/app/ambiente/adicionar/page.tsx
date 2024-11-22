"use client";

import Header from "@/components/Menu/Header";
import { Sidebar } from "@/components/Menu/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Ambientes() {
  return (
    <div>
      <SidebarProvider>
        <div className="hidden md:flex min-w-[300px] border-r min-h-screen">
          <Sidebar />
        </div>
        <main className="grid w-full h-full">
          <Header />
          <h1 className="titulo">Adicionando ambiente</h1>
          <hr className="linha" />

          <section>

          </section>
        </main>
      </SidebarProvider>
    </div>
  );
}
