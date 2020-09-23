import React, {useEffect, useState} from "react";
import LinkForm from "./LinkForm";
import {db} from '../firebase';
import {toast} from "react-toastify";

const Links = () => {

    const [links, setLinks] = useState([]);
    const [currentId,setCurrentId] = useState('');

    const addOrEditLink = async (linkObject) => {
        try {
            if (currentId === '') {
                await db.collection('links').doc().set(linkObject);
                toast('New link add', {type: 'success'});

            } else {
                db.collection('links').doc(currentId).update(linkObject);
                toast('link update', {type: 'info'});
                setCurrentId('');
            }
        }catch (error){
            console.log(error);
        }
    }

    const getLinks = async () => {
        await db.collection('links').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({...doc.data(), id: doc.id});
            });
            setLinks(docs);
        });

    }

    const onDeleteLink = async (id) => {
        if (window.confirm('Delete link?')) {
           await db.collection('links').doc(id).delete();
            toast('deleted link',{type:'error',autoClose:2000});
        }
    }

    useEffect(() => {
        getLinks();
    }, [])
    return <div  className="container justify-content-md-center">
        <div className="container col-md-4">
            <LinkForm{ ...{addOrEditLink,currentId,links}}/>
        </div>
        <div className="col-md-8 p-2"></div>
        {links.map(link => (
            <div className="card mb-1" key={link.id}>
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h4>{link.name}</h4>
                        <div>
                            <i className="material-icons" onClick={() => onDeleteLink(link.id)}>close</i>
                            <i className="material-icons" onClick={() => setCurrentId(link.id)}>create</i></div>
                    </div>
                    <p>{link.description}</p>
                    <a href={link.url} target="_blank" rel="noopener noreferrer"> Go to site</a>
                </div>
            </div>
        ))}
    </div>
}

export default Links;
