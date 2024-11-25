"use client";

import Header from "@/components/Menu/Header";
import { Sidebar } from "@/components/Menu/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import './style.css'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Relatorio() {
  return (
    <div>
      <SidebarProvider>
        <div className="hidden md:flex min-w-[300px] border-r min-h-screen">
          <Sidebar />
        </div>
        <main className="grid w-full h-full">
          <Header />

          <h1 className="titulo">Relatório de uso de ambientes</h1>
          <hr className="linha" />

          <section className="text-center">
            <h2 className="subtitulo m-0">Quantidades de reservas do mês</h2>
            <hr className="linha max-w-80 mt-2"/>

            {/* Exemplos */}
            <Card className="cardRelatorio">
              <CardHeader>
                <CardTitle><span className="titulo">Auditório</span></CardTitle>
              </CardHeader>
              <CardContent>
                <p className="relatorioAmbiente">Exemplo</p>
              </CardContent>
            </Card>
            <Card className="cardRelatorio">
              <CardHeader>
                <CardTitle><span className="titulo">Alphalab</span></CardTitle>
              </CardHeader>
              <CardContent>
                <p className="relatorioAmbiente">Exemplo</p>
              </CardContent>
            </Card>
            <Card className="cardRelatorio">
              <CardHeader>
                <CardTitle><span className="titulo">Auditório</span></CardTitle>
              </CardHeader>
              <CardContent>
                <p className="relatorioAmbiente">Exemplo</p>
              </CardContent>
            </Card>
            <Card className="cardRelatorio">
              <CardHeader>
                <CardTitle><span className="titulo">Alphalab</span></CardTitle>
              </CardHeader>
              <CardContent>
                <p className="relatorioAmbiente">Exemplo</p>
              </CardContent>
            </Card>
            <Card className="cardRelatorio">
              <CardHeader>
                <CardTitle><span className="titulo">Auditório</span></CardTitle>
              </CardHeader>
              <CardContent>
                <p className="relatorioAmbiente">Exemplo</p>
              </CardContent>
            </Card>

            <hr />

            <h2 className="subtitulo">Quantidades de cancelamentos de reservas do mês</h2>
            <hr className="linha max-w-80 mt-2"/>

            {/* Exemplos */}
            <Card className="cardRelatorio">
              <CardHeader>
                <CardTitle><span className="titulo">Alphalab</span></CardTitle>
              </CardHeader>
              <CardContent>
                <p className="relatorioAmbiente">Exemplo</p>
              </CardContent>
            </Card>
            <Card className="cardRelatorio">
              <CardHeader>
                <CardTitle><span className="titulo">Auditório</span></CardTitle>
              </CardHeader>
              <CardContent>
                <p className="relatorioAmbiente">Exemplo</p>
              </CardContent>
            </Card>

            <hr />

            <h2 className="subtitulo">Dias da semana com maior quantidade de reserva no mês</h2>
            <hr className="linha max-w-80 mt-2"/>

            {/* Exemplos */}
            <Card className="cardRelatorio">
              <CardHeader>
                <CardTitle><span className="titulo">Alphalab</span></CardTitle>
              </CardHeader>
              <CardContent>
                <p className="relatorioAmbiente">Exemplo</p>
              </CardContent>
            </Card>
            <Card className="cardRelatorio">
              <CardHeader>
                <CardTitle><span className="titulo">Auditório</span></CardTitle>
              </CardHeader>
              <CardContent>
                <p className="relatorioAmbiente">Exemplo</p>
              </CardContent>
            </Card>
            <Card className="cardRelatorio">
              <CardHeader>
                <CardTitle><span className="titulo">Auditório</span></CardTitle>
              </CardHeader>
              <CardContent>
                <p className="relatorioAmbiente">Exemplo</p>
              </CardContent>
            </Card>

            <hr />

            <h2 className="subtitulo">Dias da semana com menor quantidade de reserva no mês</h2>
            <hr className="linha max-w-80 mt-2"/>

            {/* Exemplos */}
            <Card className="cardRelatorio">
              <CardHeader>
                <CardTitle><span className="titulo">Alphalab</span></CardTitle>
              </CardHeader>
              <CardContent>
                <p className="relatorioAmbiente">Exemplo</p>
              </CardContent>
            </Card>
            <Card className="cardRelatorio">
              <CardHeader>
                <CardTitle><span className="titulo">Auditório</span></CardTitle>
              </CardHeader>
              <CardContent>
                <p className="relatorioAmbiente">Exemplo</p>
              </CardContent>
            </Card>
            <Card className="cardRelatorio">
              <CardHeader>
                <CardTitle><span className="titulo">Auditório</span></CardTitle>
              </CardHeader>
              <CardContent>
                <p className="relatorioAmbiente">Exemplo</p>
              </CardContent>
            </Card>

          </section>
        </main>
      </SidebarProvider>
    </div>
  );
}
