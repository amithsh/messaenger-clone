"use client";
import React from "react";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Conversation, Message, User } from "@prisma/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { FullConversationType } from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/components/Avatar";

interface ConversationBoxProps {
  data: FullConversationType;
  seleted?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({ data, seleted }) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push("/conversations/${data.id}");
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.message || [];

    return messages[messages.length - 1];
  }, [data.message]);

  const useremail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];
    if (!useremail) {
      return false;
    }
    return seenArray.filter((user) => user.email == useremail).length != 0;
  }, [useremail, lastMessage]);

  const lastMessagetext = useMemo(() => {
    if (lastMessage?.image) {
      return "sent an image";
    }
    if (lastMessage?.body) {
      return lastMessage.body;
    }
    return "started a conversation";
  }, [lastMessage]);
  return (
    <div
      onClick={handleClick}
      className={clsx(
        `
            w-full
            relative
            flex
            items-center
            space-x-3
            hover:bg-neutral-100
            rounded-lg
            transition
            cursor-pointer   
            p-3
        `,
        seleted ? "bg-neutral-100" : "bg-white"
      )}
    >
      <Avatar user={otherUser} />
      <div className="min-w-0 flex-1 ">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-md font-medium text-gray-900">
              {data.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p>{format(new Date(lastMessage.createdAt), "p")}</p>
            )}
          </div>
          <p
            className={clsx(`
                truncate
                text-xs
          `, hasSeen? 'text-gray-500': 'text-black font-medium')}
          >
            {lastMessagetext}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
