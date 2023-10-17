import { createForm } from "@formily/core";
import { Field, FormProvider } from "@formily/react";
import { Input, Select, Transfer } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useRef } from "react";
import styled from "styled-components";

import FormItem from "@/components/form/form-item";
import FormLayout from "@/components/form/form-layout";

import { PermissionTree } from "./components/permission-tree";
import { useStep } from "./hooks";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const SectionCard = styled.div`
  padding: 2rem;
  margin-bottom: 2rem;
  border-radius: 1rem;
  background-color: #fff;
`;

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Footer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
`;

const PermissionSelectContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > span {
    margin-bottom: 1rem;
  }
`;

const stepItems = [
  {
    title: "填写基本信息",
    description: "填写角色名称及角色说明",
  },
  {
    title: "选择权限",
    description: "为角色配置平台访问及操作权限",
  },
  {
    title: "绑定成员",
    description: "选择于当前角色绑定的成员",
  },
  {
    title: "确认信息",
    description: "确认信息无误后，完成新增",
  },
];

export default function NewRole() {
  const basicInfoForm = useRef(createForm());
  const permissionSelectForm = useRef(createForm());
  const memberBindForm = useRef(createForm());

  const stepForms = [basicInfoForm, permissionSelectForm, memberBindForm];

  // test
  const treeData = [
    {
      title: "业务大屏",
      key: "0",
      children: [
        {
          title: "站点视角",
          key: "0-1",
        },
        {
          title: "机构视角",
          key: "0-2",
        },
        {
          title: "查看",
          key: "0-3",
        },
      ],
    },
    {
      title: "站点管理",
      key: "1",
      children: [
        { title: "查看/筛选", key: "1-1" },
        { title: "新增/编辑站点", key: "1-2" },
      ],
    },
    {
      title: "个人信息",
      key: "2",
    },
  ];

  const stepFormComponents = [
    <FormProvider form={basicInfoForm.current} key={0}>
      <FormLayout layout="horizontal" labelCol={8} wrapperCol={16}>
        <Field
          name="institute"
          title="所属机构"
          required
          decorator={[FormItem]}
          component={[
            Select,
            {
              placeholder: "请选择所属机构",
              options: [{ label: "1", value: "1" }],
            },
          ]}
          validator={{ required: true }}
        />
        <Field
          name="name"
          title="角色名称"
          decorator={[FormItem]}
          component={[Input, { placeholder: "请选择角色名称" }]}
          validator={{ required: true }}
        />
        <Field
          name="description"
          title="角色说明"
          decorator={[FormItem]}
          component={[TextArea, { placeholder: "请输入角色说明" }]}
        />
      </FormLayout>
    </FormProvider>,
    <PermissionSelectContainer key={1}>
      <FormProvider form={permissionSelectForm.current}>
        <Field
          name="permission"
          decorator={[FormItem]}
          dataSource={treeData}
          component={[
            PermissionTree,
            {
              checkable: true,
              defaultExpandAll: true,
            },
          ]}
        />
      </FormProvider>
    </PermissionSelectContainer>,
    <FormProvider form={memberBindForm.current} key={2}>
      <Field
        name="member"
        dataSource={[
          { title: "选项1", key: 1 },
          { title: "选项2", key: 2 },
        ]}
        decorator={[FormItem]}
        component={[
          Transfer,
          {
            render: (item) => item.title,
          },
        ]}
      />
    </FormProvider>,
    <div key={3}>4</div>,
  ];

  const handleFinish = () => {
    console.log("finish");
  };

  const { stepIndicator, currentStepForm, previousButton, nextButton } =
    useStep({
      stepItems,
      stepFormComponents,
      stepForms,
      handleFinish,
    });

  return (
    <Container>
      <SectionCard>{stepIndicator}</SectionCard>
      <SectionCard>
        <FormContainer>{currentStepForm}</FormContainer>
      </SectionCard>
      <Footer>
        <SectionCard>
          {previousButton}
          {nextButton}
        </SectionCard>
      </Footer>
    </Container>
  );
}
