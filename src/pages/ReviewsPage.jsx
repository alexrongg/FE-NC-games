import ReviewCard from "../components/ReviewCard";
import {useState} from "react"

export default function ReviewsPage() {
    const [sortby, setSortby] = useState({
        "sortby" : "created_at",
        "direction" : "ASC"
    });
    const [direction, setDirection] = useState("DESC");
    const [sortbyKey, setSortbyKey] = useState("created_at")

    const sortClickHandler = (sortedBy) => {
        setDirection("ASC")
        if (sortbyKey === sortedBy && direction === "ASC") {
            setDirection("DESC")
            
        }
        setSortby({
            "sortby" : sortedBy,
            "direction" : direction
        })
        setSortbyKey(sortedBy)
    }


    return (
    <div className="sort">
        <thead>
        <tr>
            <th>
                <p>Sort by   :</p>
            </th>
            <th>
            <button type="button" onClick={() => {
                setSortbyKey("created_at")
                return sortClickHandler("created_at")
                }}>
                Date created
            </button>
            </th>
            <th>
            <button type="button" onClick={() => {
                setSortbyKey("votes")
                return sortClickHandler("votes")
                }}>
                Votes
            </button>
            </th>
        </tr>
        </thead>
        <ReviewCard sortby={sortby}></ReviewCard>
    </div>
    );
};