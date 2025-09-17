import { useState, useEffect } from "react";
import ThoughtsForm from "./ThoughtsForm"
import ThoughtsList from "./ThoughtsList"

export const Thoughts = () => {
    const [thoughtList, setThoughtList] = useState([])
    const [newThought, setNewThought] = useState ("")
    const [error, setError] = useState(null);
    const [likedThoughts, setLikedThoughts] = useState([]);
    const [loading, setLoading] = useState(false)

    const fetchThoughts = () => {
        setLoading(true);

        fetch ("https://technigo-project-happy-thoughts-api-u2n1.onrender.com/thoughts")
        .then (res => res.json())
        .then((json) => {
            setThoughtList(json);
        })
        .catch((err) => {
            setError("Failed to load thoughts");
        })
        .finally(() => {
            setLoading(false);
        });
    };

    useEffect (() => {
        fetchThoughts ()
    }, [])

    const onNewThoughtChange = (event) => {
        setNewThought(event.target.value);
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        setLoading (true);

        if (newThought.trim().length < 5) {
            setError("Your thought must be at least 5 characters");
            setNewThought("");
            setTimeout(() => setError(null), 3000);
            return;
        }
        if (newThought.trim().length > 140) {
            setError("Thought must be no more than 140 characters");
            setNewThought("");
            setTimeout(() => setError(null), 3000);
            return;
        }

        fetch ("https://technigo-project-happy-thoughts-api-u2n1.onrender.com/thoughts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                message: newThought 
            }), 
        })
        .then((res) => {
            if (!res.ok) {
                return res.json().then((error) => {
                    throw new Error(error.message);
                });
            }
            return res.json();
        })
        .then((newThought) => {
            setThoughtList((prevList) => [newThought, ...prevList]);
            setNewThought("");
            setError(null);
        })
        .catch((error) => {
            setError(err.message);
            setNewThought("");
        })
        .finally(() => {
            setLoading(false);
      });
    }
    
    const handleLike = (thoughtId) => {
        fetch(`https://technigo-project-happy-thoughts-api-u2n1.onrender.com/thoughts/:thoughtId/like`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        })
        .then((res) => res.json())
        .then((updatedThought) => {
            setThoughtList((prevList) =>
                prevList.map((thought) =>
                    thought._id === thoughtId
                        ? { ...thought, hearts: updatedThought.hearts}
                        : thought
                )
            );
            setLikedThoughts((prev) => [...prev, thoughtId]);
        })
        .catch((err) => {
            console.error("Error liking thought:", err);
        });
    };
        return (
            <div className="wrapper">
                <ThoughtsForm 
                    newThought={newThought}
                    onNewThoughtChange={onNewThoughtChange}
                    onFormSubmit={onFormSubmit}
                />
                {error && <h3 className="error-message">{error}</h3>}
                <ThoughtsList 
                    thoughtList={thoughtList} 
                    onLike={handleLike}
                    likedThoughts={likedThoughts} 
                    loading={loading}
                />
            </div>
        )
}
