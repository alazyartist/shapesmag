import { useUser } from "@clerk/nextjs";
import React from "react";
const useIsAdmin = () => {
  const user = useUser();

  return user?.user?.publicMetadata?.isAdmin as boolean;
};

export default useIsAdmin;
