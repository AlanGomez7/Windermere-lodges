"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import dynamic from "next/dynamic";

const ChatDialog = dynamic(() =>
  import("@/components/chatbot/chatbot-dialog").then(
    (dialog) => dialog.ChatbotDialog
  )
);

export const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 p-0 shadow-lg bg-emerald-600 hover:bg-emerald-700 z-50"
        aria-label="Open chat assistant"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>

      {isOpen&&<ChatDialog open={isOpen} onOpenChange={setIsOpen} />}
    </>
  );
};
