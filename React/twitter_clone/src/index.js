import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import chatHead from './images/Eyebrows.jpg';
import moment from 'moment';

const initialDatum = [
    {
    image: chatHead,
    userName: 'Eyebrows White',
    content: 'All for one, one for all.'
    },
    {
        image: chatHead,
        userName: 'Eyebrows White',
        content: 'If you wish to succeed, you should use persistence as your good friend, experience as your reference, prudence as your brother and hope as your sentry.'
    },
    {
        image: chatHead,
        userName: 'Eyebrows White',
        content: 'The environment will never be perfect, negative people affected by environmental control, positive people control environment.'
    },
    {
        image: chatHead,
        userName: 'Eyebrows White',
        content: 'Keep on going, never give up.'
    }
];

const TweetBox = (props) => {
    const [count, setCount] = useState(250);
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        let maxLen = e.target.maxLength;
        let inputLen = e.target.value.length;
        setCount(maxLen - inputLen);
        setValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let time = moment(new Date()).format('MMMM DD, YYYY HH:mm');
        props.handleSubmit(value, time);
        setValue('');
        setCount(250);
    }

    const handleFocus = (e) => {
        e.target.style.boxShadow = '1px 1px 5px #1da1f2';
    }

    const handleBlur = (e) => {
        e.target.style.boxShadow = '';
    }

    const handleMouseOver = (e) => {
        e.target.style.boxShadow = '1px 1px 5px #1da1f2';
    }

    const handleMouseOut = (e) => {
        if (e.target !== document.activeElement) {
            e.target.style.boxShadow = '';
        }
    }

    const button = (value) => {
        if (value) {
            return <button className="add-post" type="submit">Add Post</button>
        } else {
            return <button className="dis-post" type="submit" disabled>Add Post</button>
        }
    }

    return (
        <form className="tweet-box" onSubmit={handleSubmit}>
            <div className="form-group">
                <textarea
                    rows="4"
                    cols="46"
                    maxLength="250"
                    placeholder="Tweet your thoughts..."
                    wrap='hard'
                    value={value}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur= {handleBlur}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                >
                </textarea>
                <p className="count">{count}</p>
            </div>
            <div className="submit-button">
                {button(value)}
            </div>
        </form>
    )
}

const ShowBox = ({ data }) => {
    let {image, userName, content} = data;
    let now = moment(new Date()).format('MMMM DD, YYYY HH:mm');

    const [toggle, setToggle] = useState(0);
    const [detail, setDetail] = useState(content);
    const [count, setCount] = useState('');
    const [time, setTime] = useState(now);


    const handleMouseOver = (e) => {
        e.target.style.paddingTop = '';
        e.target.style.paddingBottom = '';
    }
    const handleMouseOut = (e) => {
        e.target.style.paddingTop = '';
        e.target.style.paddingBottom = '';
    }
    const handleEdit = () => {
        setToggle(1);
    }
    const handleDelete = () => {
        setToggle(2);
    }
    const handleCancel = () => {
        setDetail(content);
        setToggle(0);
    }
    const handleSave = () => {
        setToggle(0);
        setTime(now);
    }
    const handleChange = (e) => {
        let maxLen = e.target.maxLength;
        let inputLen = e.target.value.length;
        setCount(maxLen - inputLen);
        setDetail(e.target.value);
    }

    let editContent = (
        <div
            className="show-box"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            <textarea
                rows="4"
                cols="56"
                maxLength="250"
                defaultValue={detail}
                onChange={handleChange}
            >
            </textarea>
            <p className="count">{count}</p>
            <button className="save" onClick={handleSave}>Save</button>
            <button className="cancel" onClick={handleCancel}>Cancel</button>
        </div>
    );

    let showContent = (
        <div className="show-box" id="show-box" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <div className="author">
            <img src={image} alt='chatHead' />
            <p><strong>{userName}</strong></p>
        </div>
        <div className="content">
            <p>{detail}</p>
        </div>
        <div className="bottom-bar">
            <div className="manipulation">
                <button type="button" className='edit' onClick={handleEdit}>Edit</button>
                <button type="button" className='delete' onClick={handleDelete}>Del</button>
            </div>
            <div className="clf">
                <button type="button" className='comment'>Comment</button>
                <button type="button" className='like'>Like</button>
                <button type="button" className='forward'>Forward</button>
            </div>
            <div className="tweet-time">
                <p>{time}</p>
            </div>
        </div>
        </div>
    );
    let childContent = toggle === 0 ? showContent : toggle === 1 ? editContent : null;

    return (<>{childContent}</>);
}

const ShowBoxes = ({ datum}) => {
    const showList = datum.map((data) => (<ShowBox key={data.content} data={data} />));

    return (<>{showList}</>);
}

const App = () => {
    const [datum, setDatum] = useState(initialDatum);

    const handleSubmit = (value) => {
        let data = {
            image: chatHead,
            userName: 'Eyebrows White',
            content: value
        };
        setDatum([...datum, data]);
    }

    return (
        <div className="all">
            <TweetBox handleSubmit={handleSubmit} />
            <ShowBoxes datum={datum} />
        </div>
    );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);