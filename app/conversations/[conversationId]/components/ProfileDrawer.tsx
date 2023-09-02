"use client";

import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import React, { Fragment, useMemo } from "react";
import { format } from "date-fns";
import { Transition } from "@headlessui/react";
import {Dialog} from "@headlessui/react"

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Conversation & {
    users: User[];
  };
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const otheruser = useOtherUser(data);

  const joinedDate = useMemo(() => {
    return format(new Date(otheruser.createdAt), "pp");
  }, [otheruser.createdAt]);

  const title = useMemo(() => {
    return data.name || otheruser.name;
  }, [data.name, otheruser.name]);

  const statuseText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }
    return "Active";
  }, [data]);
  return (
    <div>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onclick} >
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
             <div
                className="fixed inset-0 bg-black bg-opacity-40"
             >
                
            </div>   
            </Transition.Child>            
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default ProfileDrawer;
