import { message } from "antd";
import axios, { AxiosError, AxiosResponse } from "axios";

import { LocalKeyEnum } from "@/constants/local-key";
import { LoginResult } from "@/types/base";
import { ResponseData } from "@/types/request";

import { LocalStorageUtils } from "./local-storage";

interface RequestOptions {
  url: string;
  method: "get" | "post" | "put" | "delete";
  data?: Record<string, unknown>;
  query?: Record<string, string>; // 用于 url 拼接
  header?: Record<string, unknown>;
}

const request = async <T>(options: RequestOptions): Promise<T | null> => {
  const { method, url, data, query, header } = options;

  let processedUrl = url;

  // 构造 query
  if (query) {
    processedUrl += "?";
    processedUrl += Object.entries(query)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
  }

  // 处理 data
  for (const key in data) {
    if (data[key] == null) {
      delete data[key];
    }
  }

  // 获取 token
  const loginResult = LocalStorageUtils.getItem<LoginResult>(
    LocalKeyEnum.LOGIN_RESULT,
  );
  const token = loginResult?.token;
  // 发起请求
  return axios
    .request<ResponseData<T>>({
      url: processedUrl,
      method,
      data,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
        Accept: "application/json",
        ...header,
      },
    })
    .then((axiosResponse: AxiosResponse<ResponseData<T>>) => {
      console.debug(
        `${new Date().toLocaleString("zh", {
          hour12: false,
        })}【${processedUrl}】：`,
        axiosResponse.data,
      );
      if (axiosResponse.data.code !== 0) {
        return Promise.reject(axiosResponse.data);
      }
      return axiosResponse.data.data;
    })
    .catch(async (error: ResponseData<T> | AxiosError<ResponseData<T>>) => {
      const DEFAULT_ERROR_MESSAGE = "请求发生错误，请联系管理员";
      let errorMessage = DEFAULT_ERROR_MESSAGE;
      if (error instanceof AxiosError) {
        if (error.response?.data.message != null) {
          errorMessage = error.response.data.message;
        }
      } else {
        // error is ResponseData<T>
        if (error.message != null) {
          errorMessage = error.message;
        }
      }

      await message.error({
        duration: 1.5,
        content: errorMessage,
      });
      // 未认证，跳转到登录页（此时一定是带了 token，但是过期了的）（未授权是 403，不做跳转）
      if (error instanceof AxiosError && error?.response?.status === 401) {
        window.location.replace("/login");
      }
      return Promise.reject(errorMessage);
    });
};

export default request;
