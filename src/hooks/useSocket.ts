import { useEffect } from "react";
import { useAppDispatch } from ".";
import { wsInit, wsOnClose } from "../services/actions";

export const useSocket = (url: string) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(wsInit(url));

    return () => {
      dispatch(wsOnClose());
    };
  }, [dispatch, url]);
};
