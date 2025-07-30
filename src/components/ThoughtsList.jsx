const ThoughtsList = ({thoughtList, onLike, likedThoughts, loading}) => {

    if (loading) {
            return <h4> ❤️ Loading happy thoughts ❤️</h4>
        }

    //get timestamp to show how long ago input was posted
    const getRelativeTime = (timestamp) => {
    const now = new Date();
    const created = new Date(timestamp);
    const diffInSeconds = Math.floor((now - created) / 1000);

        if (diffInSeconds < 60) {
            return `${diffInSeconds} second${diffInSeconds !== 1 ? "s" : ""} ago`; } 
        else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`; } 
        else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `${hours} hour${hours !== 1 ? "s" : ""} ago`; } 
        else {
            const days = Math.floor(diffInSeconds / 86400);
            return `${days} day${days !== 1 ? "s" : ""} ago`; }
        }; 

    return (
        <div className="thoughts-list">
            {thoughtList.map((thought) => {
            const isLiked = likedThoughts.includes(thought._id);

                return(
                    <div key={thought._id} className="thought-card">
                        <p>{thought.message}</p>
                        <div className="like-time-bar">
                            <div className="like-bar"> 
                                <button className={`heart-button ${isLiked ? "liked" : ""}`} onClick={() => onLike(thought._id)}> ❤️ </button>
                                <p>{thought.hearts}</p>
                            </div>
                            <div className="time-bar">
                                <p>{getRelativeTime(thought.createdAt)}</p>
                            </div>
                        </div>                               
                    </div>
                );
            })}
        </div>
    );
};

export default ThoughtsList;