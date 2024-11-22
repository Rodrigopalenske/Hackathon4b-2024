import { BellRing } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export default function Notification() {
  return (
    /* Notificação que será acionada na tela */
    <Alert className="notificacao">
      <BellRing className="h-4 w-4" />
      <AlertTitle>Notificação</AlertTitle>
      <AlertDescription>Esta é uma mensagem de notificação.</AlertDescription>
    </Alert>
  );
}
