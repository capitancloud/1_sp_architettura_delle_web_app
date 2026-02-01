import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface LogoutButtonProps {
  className?: string;
}

export function LogoutButton({ className }: LogoutButtonProps) {
  const { logout } = useAuth();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={logout}
      className={className}
    >
      <LogOut className="w-4 h-4 mr-2" />
      Esci
    </Button>
  );
}
