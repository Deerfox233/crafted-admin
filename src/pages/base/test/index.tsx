import { TableColumnsType } from "antd";
import { useMemo } from "react";

import ActionGroup from "@/components/action-group";
import { Table } from "@/components/search-table";
import { checkPermission } from "@/utils/permission";

interface DataType {
  key: number;
  id: number;
  /**
   * 学校名称
   */
  name: string;
  /**
   * 学校类型（幼儿园 1, 小学 2, 初中 3, 高中 4, 中职 5, 附设幼儿班 6)
   */
  schoolType: string;
  /**
   * 举办者类型
   */
  organizerType: string;
  /**
   * 	城乡分组（农村1, 县镇2, 城市3）
   */
  urbanRuralGroup: string;
  /**
   * 城乡类型
   */
  urbanRuralType: string;
  /**
   * 地区
   */
  region: string;
}

const TestPage = () => {
  const columns: TableColumnsType<DataType> = useMemo(() => {
    const columns = [
      {
        title: "学校名称",
        dataIndex: "name",
        width: "20%",
        ellipsis: true,
      },
      {
        title: "学校类型",
        dataIndex: "schoolType",
        width: "10%",
        ellipsis: true,
      },
      {
        title: "学校办学类型",
        dataIndex: "schoolTypeName",
        width: "10%",
        ellipsis: true,
        render: (text: string) => <div>{text || "-"}</div>,
      },
      {
        title: "举办者类型",
        dataIndex: "organizerType",
        width: "15%",
        ellipsis: true,
        render: (text: string) => <div>{text || "-"}</div>,
      },
      {
        title: "城乡分组",
        dataIndex: "urbanRuralGroup",
        width: "10%",
        ellipsis: true,
        render: (text: string) => <div>{text || "-"}</div>,
      },
      {
        title: "城乡类型",
        dataIndex: "urbanRuralType",
        width: "15%",
        ellipsis: true,
        render: (text: string) => <div>{text || "-"}</div>,
      },
      {
        title: "县区",
        dataIndex: "region",
        width: "10%",
        ellipsis: true,
      },
    ];
    if (
      checkPermission("PermissionCode.SCHOOL.UPDATE") ||
      checkPermission("PermissionCode.SCHOOL.DELETE")
    ) {
      columns.push({
        title: "操作",
        dataIndex: "operation",
        render: (_: unknown, record: DataType) => (
          <ActionGroup
            items={[
              {
                permissionCode: "PermissionCode.SCHOOL.UPDATE",
                text: "编辑",
                onClick: () => {
                  console.log("编辑", record.id);
                },
              },
              {
                permissionCode: "PermissionCode.SCHOOL.DELETE",
                text: "删除",
                onClick: () => {
                  console.log("删除", record.id);
                },
              },
            ]}
          />
        ),
      });
    }
    return columns;
  }, []);

  return <Table columns={columns} request={undefined} />;
};

export default TestPage;
