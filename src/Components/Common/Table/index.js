import React from "react";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import "./Table.css";

const Table = ({ columns, data, onEdit, onDelete, showActions }) => {
    return (
        <div className="table-container">
            <table className="table table-responsive">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key} className={`${column.key}-column`}>
                                {column.label}
                            </th>
                        ))}
                        {showActions && <th className="actions">Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item._id}>
                            {columns.map((column) => (
                                <td key={column.key} data-label={column.label} className={`${column.key}-column`}>
                                    {column.key === "image" ? (
                                        <img
                                            src={`data:image/png;base64,${item[column.key]}`}
                                            alt={`${item.stageName || item.verticalName} icon`}
                                            className="data-icons"
                                        />
                                    ) : column.key === "index" ? (
                                        index + 1
                                    ) : (
                                        item[column.key]
                                    )}
                                </td>
                            ))}
                            {showActions && (
                                <td className="actions">
                                    <EditIcon onClick={() => onEdit(item._id)} className="edit-icon" />
                                    <DeleteIcon onClick={() => onDelete(item._id)} className="delete-icon" />
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
