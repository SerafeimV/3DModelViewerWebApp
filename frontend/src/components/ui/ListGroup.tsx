import {useState} from "react";
import Button from "./Button.tsx";

interface ListGroupProps {
    items: string[];
    listName: string;
}

function ListGroup({items, listName}: ListGroupProps) {

    const [selectedIndex, setSelectedIndex] = useState(-1);

    return (
        <>
            <div className="panel-heading"><h3 className="panel-title">{listName}</h3>
            </div>
            <div className="panel-body">
                {items.length === 0 && <p><strong>No Models found.</strong></p>}
                <ul className="list-group">
                    {items.map((item, index) => (
                        <li className={selectedIndex === index ? "list-group-item active" : "list-group-item"}
                            id={"list-group-item"}>
                            <div className="row" style={{margin: "0"}}>
                                <Button onClick={() => setSelectedIndex(index)}>
                                    {item}
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