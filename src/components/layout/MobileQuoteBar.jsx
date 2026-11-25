import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/Button.jsx";

export function MobileQuoteBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex min-h-16 items-center justify-between gap-3 border-t border-line bg-page/95 px-4 py-2 backdrop-blur-xl sm:hidden">
      <span className="text-sm font-semibold text-ink">
        Have a project in mind?
      </span>
      <Button to="/start-project" size="small">
        Start a Project
        <ArrowUpRight aria-hidden="true" size={16} />
      </Button>
    </div>
  );
}
