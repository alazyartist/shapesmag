import React from "react";

const useIsAdmin = (user) => {
  return user.user?.publicMetadata.isAdmin;
};

export default useIsAdmin;
