import styled from "styled-components";

import { ActionTypeEnum } from "../../constants/action-type";
import { ComponentEnum } from "../../constants/component";
import { ObjectData as ObjectProps } from "../../types/object";
import { usePageContext } from "../context";

const Contaienr = styled.div`
  grid-area: main;

  background-color: #f5f5f5;
  width: 100%;
  height: 100%;

  display: grid;
  grid-template:
    "empty ruler-x" 1.8rem
    "ruler-y editor" 1fr / 1.8rem 1fr;
`;

const BlankCube = styled.div`
  grid-area: empty;
`;

const RulerX = styled.div`
  grid-area: "ruler-x";
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAASCAMAAAAuTX21AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRFMzMzAAAA////BqjYlAAAACNJREFUeNpiYCAdMDKRCka1jGoBA2JZZGshiaCXFpIBQIABAAplBkCmQpujAAAAAElFTkSuQmCC)
    repeat-x;
  opacity: 0.6;
`;

const RulerY = styled.div`
  grid-area: "ruler-y";
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAyCAMAAABmvHtTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRFMzMzAAAA////BqjYlAAAACBJREFUeNpiYGBEBwwMTGiAakI0NX7U9aOuHyGuBwgwAH6bBkAR6jkzAAAAAElFTkSuQmCC)
    repeat-y;
  opacity: 0.6;
`;

const Editor = styled.div`
  grid-area: editor;
  background: url("./src/assets/dot.bmp") repeat;

  position: relative;
`;

// TODO 结构调整，改为 Wrapper
const Object = ({ name, props, id, position }: ObjectProps) => {
  const {
    state: { currentId },
    dispatch,
  } = usePageContext();
  const Component = ComponentEnum[name];
  // TODO 外移
  const ObjectContainer = styled.div`
    /* &:hover {
      border: 1px solid #ccc;
    } */
    border: ${currentId === id ? "1px solid #1890ff" : "none"};
    user-select: none;

    position: absolute;
    top: ${position.y}px;
    left: ${position.x}px;
    z-index: 2000;
  `;
  return (
    <ObjectContainer
      draggable
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({
          type: ActionTypeEnum.SELECT_OBJECT,
          payload: {
            id,
          },
        });
      }}
    >
      <Component key={id} {...props} />
    </ObjectContainer>
  );
};

export const Main = () => {
  const {
    state: { objects },
    dispatch,
  } = usePageContext();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const position = getDropPosition(e);
    dispatch({
      type: ActionTypeEnum.MODIFY_OBJECT,
      payload: {
        position,
      },
    });
  };

  const getDropPosition = (e: React.MouseEvent<Element, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return { x, y };
  };

  return (
    <Contaienr
      onClick={(e) => {
        e.preventDefault();
        dispatch({
          type: ActionTypeEnum.UNSELECT_OBJECT,
        });
      }}
      onDragEnter={(e) => {
        e.preventDefault();
        console.log("drag enter");
      }}
      onDragOver={(e) => {
        e.preventDefault();
        console.log("drag over");
      }}
      onDrop={handleDrop}
    >
      <BlankCube />
      <RulerX />
      <RulerY />
      <Editor>
        {objects.map((object) => (
          <Object key={object.id} {...object} />
        ))}
      </Editor>
    </Contaienr>
  );
};
