import ListGroup from "../ui/ListGroup.tsx";
import type {ModelFile} from "../../api/types.ts";

interface AllModelsProps {
    items: ModelFile[];
    setOnSelect?: (file: string) => void;
    setSelectedIndex?: (id: number) => void;
}

function AllModels({items, setOnSelect, setSelectedIndex}: AllModelsProps) {
    return (
        <>
            <ListGroup items={items} setSelectedIndex={setSelectedIndex} setOnSelect={setOnSelect}
                       listName={"All Models"}/>
        </>
    );
}

export default AllModels;