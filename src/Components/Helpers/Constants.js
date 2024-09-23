export const modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote", "link"],
        [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
        ["code-block"],
    ],
    clipboard: {
        matchVisual: false,
    },
};

// Admin Panel Table Column Information
export const stageColumns = [
    { key: "index", label: "Index" },
    { key: "stageName", label: "Stage Name" },
    { key: "image", label: "Stage Icon" },
];

export const userColumns = [
    { key: "index", label: "Index" },
    { key: "name", label: "Name" },
    { key: "preferredUsername", label: "Email" },
    { key: "role", label: "Role" },
    { key: "lastLoggedInTime", label: "Last LoggedIn Time" },
    { key: "countOfLoggedIn", label: "Total LoggedIn Count" },
];

export const verticalColumns = [
    { key: "index", label: "Index" },
    { key: "verticalName", label: "Vertical Name" },
    { key: "image", label: "Vertical Icon" },
];

export const teamColumns = [
    { key: "index", label: "Index" },
    { key: "functionName", label: "Function Name" },
];

export const demoDayColumns = [
    { key: "index", label: "Index" },
    { key: "number", label: "Demo Day Iteration" },
    { key: "year", label: "Demo Day Year" },
];
