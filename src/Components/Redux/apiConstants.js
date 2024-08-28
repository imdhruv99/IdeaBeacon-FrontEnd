//common endpoint
export const COMMON_APIS = {
  GET_ALL_STAGES: "/stage/v1/get-all-stage",
  GET_ALL_VERTICALS: "/vertical/v1/get-all-vertical",
  GET_ALL_FUNCTIONS: "/function/v1/get-all-function",
  GET_ALL_USER: "/user/v1/get-all-user",
  GET_ALL_TAGS: "/tag/v1/get-all-tag",
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

export const SITE_STATISTICS = {
  INCREMENT_SITE_VISIT_COUNT_STATISTICS: "/site-statistics/v1/increment-site-visit-count",
};