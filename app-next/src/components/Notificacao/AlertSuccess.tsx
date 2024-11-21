import { Check } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export default function AlertSuccess() {
  return (
    /* Notificação que será acionada na tela quando der tudo certo */
    <Alert className="notificacaoSuccess">
      <Check className="h-10 w-7" />
      <AlertTitle>Tudo certo!</AlertTitle>
      <AlertDescription>Ação realizada com sucesso.</AlertDescription>
    </Alert>
  );
}
