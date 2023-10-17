import { createContext, useContext } from "react";

import { Action, PageState } from "../../types/page-reducer";
import { usePageReducer } from "./hooks";

/**
 * 上下文数据
 */
interface ContextValue {
  state: PageState;
  dispatch: React.Dispatch<Action>;
}

const PageContext = createContext<ContextValue>({
  state: {
    objects: [],
    currentId: undefined,
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {},
});

interface PageContextProviderProps {
  children: React.ReactNode;
}

export const PageContextProvider = (props: PageContextProviderProps) => {
  const { children } = props;
  const { state, dispatch } = usePageReducer();

  return (
    <PageContext.Provider value={{ state, dispatch }}>
      {children}
    </PageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePageContext = () => {
  return useContext(PageContext);
};
