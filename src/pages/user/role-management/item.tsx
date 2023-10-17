import { MoreOutlined } from "@ant-design/icons";
import styled from "styled-components";

const Container = styled.div`
  height: 20rem;
  width: 23%;
  border: 0.1px solid #ddd;
  margin: 2rem 2rem 0 0;
  padding: 2rem;
  border-radius: 1rem;
  font-size: 1.6rem;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const RoleName = styled.div`
  margin-bottom: 1rem;
`;

const CreateTime = styled.div`
  font-size: 1.2rem;
  color: #0004;
  margin-bottom: 1rem;
`;

const Description = styled.div`
  font-size: 1.2rem;
  color: #0007;
  margin-bottom: 1rem;
`;

const Footer = styled.div`
  width: calc(100% - 4rem);
  position: absolute;
  bottom: 0;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Avatars = styled.div`
  width: 10rem;
  height: 2rem;
  background: #0001;
  border-radius: 1rem;
`;

interface ItemProps {
  roleId?: string;
  roleName: string;
}

export const Item = (props: ItemProps) => {
  const { roleId, roleName } = props;

  const handleClick = () => {
    console.log(roleId, roleName);
  };

  return (
    <Container onClick={handleClick}>
      <RoleName>{roleName}</RoleName>
      <CreateTime>创建时间：2021-01-01</CreateTime>
      <Description>
        描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述
      </Description>
      <Footer>
        <Avatars></Avatars>
        <MoreOutlined rotate={90} />
      </Footer>
    </Container>
  );
};
