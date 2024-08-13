//common endpoint
export const COMMON_APIS = {
  GET_ALL_STAGES: "/stage/v1/get-all-stage",
  GET_ALL_CATEGORIES: "/category/v1/get-all-category",
  GET_ALL_FUNCTIONS: "/function/v1/get-all-function",
  GET_SUBDIVISION_BY_FUNCTION_ID: "/subdivision/v1/get-all-subdivision-by-function-id/",
  GET_ALL_USER: "user/v1/get-all-user",
};

//auth endpoint
export const AUTH_APIS = {
  LOGIN: "/auth/v1/login",
  CREATE_USER: "/user/v1/create-user",
};

//auth endpoint
export const IDEA_APIS = {
  CREATE_IDEA: "/idea/v1/create-idea",
  GET_ALL_FILTERED_IDEAS: "/idea/v1/filter",
  GET_IDEA_DETAIL: "/idea/v1/get-idea",
  UPDATE_IDEA_DETAIL: "/idea/v1/update-idea",
};
