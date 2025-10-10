"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Router } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const ChatDialog = dynamic(() =>
  import("@/components/chatbot/chatbot-dialog").then(
    (dialog) => dialog.ChatbotDialog
  )
);

export const ChatbotButton = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => router.push("/contact")}
        className="fixed bottom-6 right-6 rounded-full p-6 shadow-lg bg-emerald-600 hover:bg-emerald-700 z-20 md:z-50"
        aria-label="Open chat assistant"
      >
        <MessageSquare className="h-6 w-6" />
        Need help?
      </Button>

      {/* {isOpen&&<ChatDialog open={isOpen} onOpenChange={setIsOpen} />} */}
    </>
  );
};
