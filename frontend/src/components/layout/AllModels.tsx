import ListGroup from "../ui/ListGroup.tsx";

interface AllModelsProps {
    items: string[];
}

function AllModels({items}: AllModelsProps) {
    return (
        <>
            <ListGroup items={items} listName={"All Models"}/>
        </>
    );
}

export default AllModels;