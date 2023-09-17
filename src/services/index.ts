import {
  toastError,
  toastInfo,
  toastSuccess,
  toastWarn,
} from "~/common/func/toast";

import axios from "axios";
import { delay } from "~/common/func/delay";
import { logout } from "~/redux/reducer/auth";
import { store } from "~/redux/store";

const axiosClient = axios.create({
  headers: {
    "content-type": "application/json",
  },
  timeout: 60000,
  timeoutErrorMessage: "Timeout error request",
});

axiosClient.interceptors.request.use(async (config) => {
  const token = store.getState().auth.token;
  config.headers.Authorization = token ? "Bearer " + token : null;

  return config;
});

axiosClient.interceptors.response.use(
  (response: any) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error: any) => {
    if (error.response && error.response.data) {
      throw error.response.data;
    }

    if (!axios.isCancel(error)) throw error;
  }
);
export default axiosClient;

export const httpRequest = async ({
  http,
  setLoading,
  msgSuccess = "Thành công",
  showMessageSuccess = false,
  showMessageFailed = false,
  onError,
}: {
  http: any;
  setLoading?: (any: any) => void;
  onError?: () => void;
  showMessageSuccess?: boolean;
  showMessageFailed?: boolean;
  msgSuccess?: string;
}) => {
  setLoading && setLoading(() => true);
  try {
    await delay(700);
    const res: any = await http;

    if (!res?.statusCode) {
      return res;
    }

    if (res.statusCode === 200) {
      showMessageSuccess && toastSuccess({ msg: msgSuccess || res?.message });
      return res?.data;
    } else {
      onError && onError();
      throw res?.message;
    }
  } catch (err: any) {
    if (err?.statusCode == 401 || err?.status == 401) {
      store.dispatch(logout());
      showMessageFailed && toastError({ msg: "Hết hạn đăng nhập" });
    } else if (typeof err == "string") {
      showMessageFailed && toastWarn({ msg: err || "Có lỗi đã xảy ra" });
    } else if (err?.code == "ERR_NETWORK" || err?.code == "ECONNABORTED") {
      showMessageFailed && toastInfo({ msg: "Kiểm tra kết nối internet" });
    }
  } finally {
    setLoading && setLoading(() => false);
  }
};
