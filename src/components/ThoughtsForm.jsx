const ThoughtsForm = ({newThought, onNewThoughtChange, onFormSubmit}) => {

    return (
        <div className="form-card">
            <div className="form-input">
                <h5>What's making you happy right now?</h5>
                <form onSubmit={onFormSubmit}>
                    <textarea
                        value={newThought}
                        onChange={onNewThoughtChange}
                        placeholder="Type your happy thought.."
                    />
                    <button className="submit-button" type="submit"> ❤️ Share your Happy Thought ❤️</button>
                </form>
            </div>
        </div>
    )
}

export default ThoughtsForm