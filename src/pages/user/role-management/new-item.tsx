import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { RoutePathEnum } from "@/constants/route-path";

const Container = styled.div`
  height: 20rem;
  width: 23%;
  border: 0.1rem dashed #bbb;
  margin: 2rem 2rem 0 0;
  padding: 2rem;
  border-radius: 1rem;
  font-size: 1.6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  color: #aaa;
  font-size: 1.6rem;
  padding-top: 1rem;
`;

export const NewItem = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(RoutePathEnum.NEW_ROLE.path);
  };

  return (
    <Container onClick={handleClick}>
      <PlusOutlined
        style={{
          fontSize: "4rem",
          color: "#bbb",
        }}
      />
      <Text>新增角色</Text>
    </Container>
  );
};
