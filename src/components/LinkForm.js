import React, {useState, useEffect} from "react";
import {db} from "../firebase";
import {toast} from "react-toastify";


const LinkForm = (props) => {
    const initialStateValues = {
        url: '',
        name: '',
        description: ''
    };

    const [values, setValues] = useState(initialStateValues);
    const handleInputChange = e => {
        const {name, value} = e.target;
        setValues({...values, [name]: value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(validURL(values.url)) {
            props.addOrEditLink(values);
            setValues({...initialStateValues});
        }else{
            toast('invalid URL ',{type:'info',autoClose:1000});
        }
    }
    const getLinkById = async (id) => {
        const doc =  await db.collection('links').doc(id).get();
        setValues({...doc.data()});
    }

    const validURL = url =>{
        var res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/g);
        if(res == null)
            return (false );
        else
            return (true);
    }

    useEffect(() => {
        if (props.currentId === '') {
             setValues({...initialStateValues});
        }else{
            getLinkById(props.currentId);
        }
    },[props.currentId])
    return (
        <div className='container'>
        <form className='card card-body' onSubmit={handleSubmit}>
            <div className='form-group input-group'>
                <div className='input-group-text bg-light'>
                    <i className="material-icons">insert_link</i>
                </div>
                <input type='text' className='form-control' placeholder='URL' name='url' onChange={handleInputChange}
                       value={values.url}/>
            </div>
            <div className='form-group input-group'>
                <div className='input-group-text bg-light'>
                    <i className="material-icons">create</i>
                </div>
                <input type='text' className='form-control' placeholder='Website name' name='name'
                       onChange={handleInputChange} value={values.name}/>
            </div>
            <div className='form-group'>
                <textarea rows="3" className='form-control' placeholder='Write a description' name='description'
                          onChange={handleInputChange} value={values.description}></textarea>
            </div>
            <button className="btn btn-primary btn-block">
                {props.currentId === '' ? 'save': 'update'}
            </button>
        </form>
        </div>
    )
}

export default LinkForm;
