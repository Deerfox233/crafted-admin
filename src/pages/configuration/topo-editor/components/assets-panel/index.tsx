import styled from "styled-components";

import { ActionTypeEnum } from "../../constants/action-type";
import { ComponentEnum } from "../../constants/component";
import { ObjectPresetEnum } from "../../constants/object-preset";
import { ObjectPreset as PresetProps } from "../../types/object-preset";
import { usePageContext } from "../context";

const Container = styled.div`
  width: 100%;
  height: 100%;
  grid-area: "assets-panel";
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  width: 100%;
`;

// const ElementList = styled.div`
//   padding: 20px;
//   height: fit-content;
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   grid-template-rows: min-content repeat(2, 1fr);
// `;

const Preset = ({ componentName, props }: PresetProps) => {
  const { dispatch } = usePageContext();
  const Component = ComponentEnum[componentName];
  return (
    <div
      style={{
        cursor: "pointer",
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({
          type: ActionTypeEnum.ADD_OBJECT,
          payload: {
            object: {
              props,
              name: componentName,
              position: {
                x: 0,
                y: 0,
              },
            },
          },
        });
      }}
    >
      <Component {...props} />
    </div>
  );
};

export const AssetsPanel = () => {
  return (
    <Container>
      <Title>图元库</Title>
      {Object.values(ObjectPresetEnum).map((preset) => {
        return <Preset key={preset.name} {...preset} />;
      })}
    </Container>
  );
};
