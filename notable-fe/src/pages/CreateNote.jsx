import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const CreateNote = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        if (id) {
            fetch(`/api/notes/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    setTitle(data.title);
                    setContent(data.content);
                });
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = id ? 'PUT' : 'POST';
        const url = id ? `/api/notes/edit/${id}` : '/api/notes/create';

        await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content }),
        });

        history.push('/');
    };

    return (
        <div>
            <h1>{id ? 'Edit Note' : 'Create Note'}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Note Title"
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Note Content"
                />
                <button type="submit">{id ? 'Update' : 'Create'} Note</button>
            </form>
        </div>
    );
};

export default CreateNote;
