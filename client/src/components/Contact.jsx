import React, { useState } from "react";
import Navbar from "./Auth/Navbar";
import axios from "axios";
import toast from "react-hot-toast";
const Contact = ({ user }) => {
  const [subject, setsubject] = useState("");
  const [body, setbody] = useState("");
  const sendEmail = async()=>
  {
    if(subject.length>0 && body.length >0)
    {
      toast("Sending Mail")
      try {
        var res =  await axios.post(
           `${process.env.REACT_APP_SERVER_URL}/api/users/sendEmail`,
           {
             email: user.email,
             subject,
             body,
           }
         );
         console.log(res);
         if(res.data.error )
         {
           toast.error(res.data.error)
         }
         else
         {
           toast.success(res.data.msg)
         }
       } catch (error) {
         console.error(error);
         toast.error(error)
       }
    }
    else
    {
      toast.error("Enter valid data")
    }
      console.log('sent');
  }
  return (
    <div>
      <Navbar user={user}></Navbar>
      <div className="contactPage">
        <h1 style={{fontSize:25,color:"#527ed8",marginBottom:20}}><b>Please send your greviances</b></h1>
        <form
          onSubmit={ (e) => {
            e.preventDefault()
           // sendEmail()
          }}
        >
          <div className="input-group">
          <label htmlFor="email">Email: &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input
              type="text"
              name="subject"
              required
              value={subject}
              style={{ width: "785px", background: "#dbd7d2" }}
              placeholder="Enter a subject"
              onChange={(e) => {
                setsubject(e.target.value);
              }}
            />
          </div>
          
          <div className="input-group">
          <label htmlFor="textarea" style={{verticalAlign:"middle"}}>Greviance:&nbsp;&nbsp;</label>
            <textarea
              name="emailBody"
              id="emailBody"
              value={body}
              style={{
                resize: "none",
                background: "#dbd7d2",
              }}
              onChange={(e) => {
                setbody(e.target.value);
              }}
              placeholder="Enter your greviance"
              cols="80"
              rows="10"
            ></textarea>
          </div>
          <center style={{marginTop:20}}>
          <button onClick={(e)=>
        {
            e.preventDefault()
            sendEmail()
            setsubject('')
            setbody('')
        }}>Submit</button>
        </center>
        </form>
      </div>
    </div>
  );
};

export default Contact;
