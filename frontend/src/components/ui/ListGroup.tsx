import {useState} from "react";
import Button from "./Button.tsx";
import type {ModelFile} from "../../api/types.ts";
import {useGetModelById} from "../../hooks/useGetModelById.tsx";

interface ListGroupProps {
    items: ModelFile[];
    listName: string;
    setSelectedIndex?: (id: number) => void;
    setOnSelect?: (file: string) => void;
}

function ListGroup({items, listName, setSelectedIndex, setOnSelect}: ListGroupProps) {

    const [selected, setSelected] = useState(-1);

    let fetchModelById = useGetModelById(setOnSelect);

    return (
        <>
            <div className="panel-heading"><h3 className="panel-title">{listName}</h3>
            </div>
            <div className="panel-body">
                {items.length === 0 && <p><strong>No Models found.</strong></p>}
                <ul className="list-group">
                    {items.map((item, index) => (
                        <li className={index === selected ? "list-group-item active" : "list-group-item"}
                            id={"list-group-item"}>
                            <div className="row" style={{margin: "0"}}>
                                <Button onClick={async () => {
                                    setSelected(index);
                                    if (setSelectedIndex) {
                                        setSelectedIndex(index)
                                    }
                                    await fetchModelById(items.at(index)?.id);
                                }}>
                                    {"id: " + item.id + " - " + item.filename}
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default ListGroup;