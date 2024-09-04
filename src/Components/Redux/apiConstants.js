//common endpoint
export const COMMON_APIS = {
  GET_ALL_STAGES: "/stage/v1/get-all-stage",
  GET_ALL_VERTICALS: "/vertical/v1/get-all-vertical",
  GET_ALL_FUNCTIONS: "/function/v1/get-all-function",
  GET_ALL_USER: "/user/v1/get-all-user",
  GET_ALL_TAGS: "/tag/v1/get-all-tag",
  GET_ALL_DEMO_DAYS: "/demo-day/v1/get-all-demo-day",
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
  DELETE_IDEA: "/idea/v1/delete-idea",
  LIKE_IDEA: "/like/v1/like-idea",
  UPDATE_IDEA_STAGE: "/idea/v1/update-idea-stage",
};

export const SITE_STATISTICS = {
  INCREMENT_SITE_VISIT_COUNT_STATISTICS: "/site-statistics/v1/increment-site-visit-count",
  GET_SITE_VISIT_COUNT_STATISTICS: "/site-statistics/v1/get-site-visit-count",
};

export const COMMENT = {
  CREATE_COMMENT: "/comment/v1/idea-comment",
  GET_COMMENT: "/comment/v1/get-idea-comment"
}