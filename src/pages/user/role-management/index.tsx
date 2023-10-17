import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import styled from "styled-components";

import { QueryKeyEnum } from "@/constants/query-key";
import { UserService } from "@/services/user";

import { Item } from "./item";
import { NewItem } from "./new-item";

const Container = styled.div`
  padding: 2rem;
  border-radius: 1rem;
  background-color: #fff;
`;

const Title = styled.div`
  font-size: 1.6rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

function RoleManagement() {
  const { fetchStatus } = useQuery({
    queryKey: [QueryKeyEnum.GET_ROLE_LIST],
    queryFn: UserService.getRoleList,
    retry: false,
    staleTime: 0,
    cacheTime: 0,
  });
  if (fetchStatus === "fetching") {
    return <Spin />;
  }

  return (
    <Container>
      <Title>角色列表</Title>
      <Content>
        <NewItem />
        <Item roleName="超级管理员" />
        <Item roleName="机构管理员" />
        <Item roleName="123" />
        <Item roleName="123" />
      </Content>
    </Container>
  );
}

export default RoleManagement;
