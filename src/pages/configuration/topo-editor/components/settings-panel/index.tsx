import { Input } from "antd";
import { useMemo } from "react";
import styled from "styled-components";

import { ActionTypeEnum } from "../../constants/action-type";
import { ComponentProps } from "../../types/component";
import { Position } from "../../types/object";
import { usePageContext } from "../context";

const Container = styled.div`
  grid-area: "setting-panel";

  /* display: flex;
  justify-content: center;
  align-items: center; */
`;

export const SettingsPanel = () => {
  const {
    state: { currentId, objects },
    dispatch,
  } = usePageContext();
  const currentObject = useMemo(
    () => objects.find(({ id }) => id === currentId),

    [currentId, objects],
  );
  return (
    <Container>
      {currentObject != null && (
        <>
          属性
          <Input.TextArea
            rows={15}
            value={JSON.stringify(currentObject.props)}
            onChange={(v) => {
              dispatch({
                type: ActionTypeEnum.MODIFY_OBJECT,
                payload: {
                  // TODO ComponentProps
                  props: JSON.parse(v.target.value) as ComponentProps,
                },
              });
            }}
          />
          位置
          <Input.TextArea
            rows={15}
            value={JSON.stringify(currentObject.position)}
            onChange={(v) => {
              dispatch({
                type: ActionTypeEnum.MODIFY_OBJECT,
                payload: {
                  // TODO Position
                  position: JSON.parse(v.target.value) as Position,
                },
              });
            }}
          />
        </>
      )}
    </Container>
  );
};
