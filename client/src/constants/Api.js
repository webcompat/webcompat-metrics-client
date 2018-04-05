/* default Config api */
export const CONFIG_API = {
  method: "get",
  credentials: "same-origin",
  headers: new Headers({
    "X-Requested-With": "XMLHttpRequest",
  }),
};
