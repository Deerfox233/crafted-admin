import * as Icons from "@ant-design/icons";
import {
  message,
  Upload as AntdUpload,
  UploadProps as AntdUploadProps,
} from "antd";
import { RcFile, UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import React, { useEffect, useState } from "react";

import { LocalKeyEnum } from "@/constants/local-key";
import { LoginResult } from "@/types/base";
import { ResponseData } from "@/types/request";
import { getResourceUrl, isLimitSize } from "@/utils";
import { LocalStorageUtils } from "@/utils/local-storage";

// Form Field 底层通过 React.cloneElement 改变了 value 和 onChange
// const Field: React.FC<FiledProps> = (props) => {
//   ...
//   const getControlled = () => {
//     return {
//       value: (getFieldValue && getFieldValue(name)) || "",
//       onChange: (e: ChangeEvent<HTMLInputElement>) => {
//         const newValue = e?.target?.value;
//         setFieldsValue && setFieldsValue({ [name]: newValue });
//       },
//     };
//   };
//   return React.cloneElement(children as React.ReactElement, getControlled());
// };

export interface UploadProps
  extends Omit<AntdUploadProps, "onChange" | "fileList"> {
  onChange?: (list: string[]) => void; // 是被 Form 增强后的
  value?: string[] | null; // 是被 Form 增强后的；value 随着 onChange 而变化
  maxFileSize: number; // 单位是 MB，必传，防止文件过大
}

const Upload: React.FC<React.PropsWithChildren<UploadProps>> = (props) => {
  const { onChange, value, maxFileSize, maxCount, children, ...restPorps } =
    props;

  const [fileList, setFileList] = useState<UploadFile<ResponseData<string>>[]>(
    [],
  );
  // 手动维持组件受控，调用顺序为（upload.onChange => props.onChange => value => fileList）
  useEffect(() => {
    if (value != null) {
      setFileList(
        value.map((fileName) => ({
          uid: fileName,
          name: fileName,
          status: "done",
          url: getResourceUrl(fileName),
          response: {
            code: 0,
            data: fileName,
          },
        })),
      );
    }
  }, [value]);

  const defaultProps = {
    maxCount: maxCount,
    multiple: true,
    action: `/is/manager/file/upload/static`,
    headers: {
      Authorization:
        LocalStorageUtils.getItem<LoginResult>(LocalKeyEnum.LOGIN_RESULT)
          ?.token ?? "",
    },
    fileList,
    beforeUpload: (file: RcFile, fileList: RcFile[]) => {
      if (maxFileSize != null && !isLimitSize(file, maxFileSize)) {
        void message.error(`文件大小不能超过 ${maxFileSize}M`);
        return false;
      }
      if (maxCount != null && fileList.length > maxCount) {
        void message.error(`文件数量不能超过 ${maxCount} 个`);
        return false;
      }
      return true;
    },
    onChange: (
      changeParam: UploadChangeParam<UploadFile<ResponseData<string>>>,
    ) => {
      const { status } = changeParam.file;
      console.debug("uploading...", status, changeParam);
      if (status !== "done") {
        // 更新组件表现形式（done 和 success 通过 onChange 更改 value 触发 useEffect 更改）
        setFileList(changeParam.fileList);
      }
      try {
        if (status === "error") {
          throw new Error(changeParam.file.response?.message);
        }
        if (status === "done") {
          if (changeParam.file.response?.code !== 0) {
            throw new Error(changeParam.file.response?.message);
          }
          // 上传成功才更新 form value
          onChange?.(
            changeParam.fileList
              .map((item) => item.response?.data)
              .filter((item) => item != null) as string[],
          );
        }
        if (status === "removed") {
          onChange?.(
            changeParam.fileList
              .map((item) => item.response?.data)
              .filter((item) => item != null) as string[],
          );
        }
      } catch (error) {
        let errorMessage = `${changeParam.file.name} 上传失败`;
        if (error instanceof Error && error?.message) {
          errorMessage = error?.message;
        }
        void message.error(errorMessage);
      }
    },
  };

  return (
    <AntdUpload {...defaultProps} {...restPorps}>
      {/* 超过最大限制，则隐藏“上传按钮”（不展示） */}
      {maxCount != null && fileList.length < maxCount ? children : null}
    </AntdUpload>
  );
};

export const ImageUploadButton: React.FC = () => {
  return (
    <div>
      <Icons.PlusOutlined style={{ marginBottom: 8 }} />
      <div>上传图片</div>
    </div>
  );
};

export default Upload;
