import { useCallback } from "react";
import { useImmerReducer } from "use-immer";

import { ActionTypeEnum } from "../../../constants/action-type";
import { Action, PageState } from "../../../types/page-reducer";

export const usePageReducer = () => {
  const pageReducer = useCallback((draft: PageState, action: Action) => {
    switch (action.type) {
      case ActionTypeEnum.ADD_OBJECT:
        draft.objects.push({
          id: `${new Date().valueOf()}${Math.random()}`,
          ...action.payload.object,
        });
        break;
      case ActionTypeEnum.SELECT_OBJECT:
        draft.currentId = action.payload.id;
        break;
      case ActionTypeEnum.UNSELECT_OBJECT:
        draft.currentId = undefined;
        break;
      case ActionTypeEnum.MODIFY_OBJECT: {
        const currentObject = draft.objects.find(
          ({ id }) => id === draft.currentId,
        );
        if (currentObject != null) {
          if (action.payload.props != null) {
            currentObject.props = action.payload.props;
          }
          if (action.payload.position != null) {
            currentObject.position = action.payload.position;
          }
        }
        break;
      }
    }
  }, []);
  const [state, dispatch] = useImmerReducer(pageReducer, {
    objects: [],
  });
  return { state, dispatch };
};
