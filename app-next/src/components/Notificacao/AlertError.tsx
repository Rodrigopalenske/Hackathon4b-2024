import { X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export default function AlertError() {
  return (
    /* Notificação que será acionada na tela quando der tudo certo */
    <Alert className="notificacaoError">
      <X className="h-14 w-8 pr-1" />
      <AlertTitle>Ocorreu um erro :(</AlertTitle>
      <AlertDescription>Ação não realizada, por favor, tente novamente como especificado.</AlertDescription>
    </Alert>
  );
}
