import { useState } from "react"
// import { useFormik } from 'formik';

// const validate = (values) => {
//     const errors = {};
//     if (!values.username) {
//       errors.username = "Username cannot be empty";
//     }

//     return errors;
// };

export default function CommentsForm({addNewComment}) {
    let [formData, setFormData] = useState({
        username: "",
        remarks: "",
        rating: 5,
    });

    // const formik = useFormik({
    //     initialValues: {
    //         username: "",
    //         remarks: "",
    //         rating: 5,
    //     },
    //     validate,
    //     onSubmit: (values) => {
    //       alert(JSON.stringify(values, null, 2));
    //     },
    // });

    // let [isValid, setIsValid] = useState(true);

    let handleInputChange = (event) => {
        setFormData((currData) => {
            return { ...currData, [event.target.name]: event.target.value };
        });
    };

    let handleSubmit = (event) => {
        addNewComment(formData);
        event.preventDefault();
        setFormData({
            username: "",
            remarks: "",
            rating: 5,
        });
    };

    return (
        <div>
            <h4>Give a Comment!</h4>
            <form 
            // onSubmit={formik.handleSubmit}
            onSubmit={handleSubmit}
            >
            <label htmlFor="username">Username: &nbsp;</label>
            <input 
            type="text"
            placeholder="enter username"
            name="username"
            // value={formik.values.username}
            value={formData.username}
            // onChange={formik.handleChange}
            onChange={handleInputChange}
            id="username"
            />
            {/* {formik.errors.username ? <p style={{color: "red"}} >{formik.errors.username}</p> : null} */}
            <br /><br />
            
            <label htmlFor="remarks">Remarks: &nbsp;</label>
            <textarea 
            placeholder="add remarks" 
            name="remarks" 
            // value={formik.values.remarks} 
            value={formData.remarks}
            // onChange={formik.handleChange} 
            onChange={handleInputChange}
            id="remarks">
            </textarea>
            <br /><br />
            
            <label htmlFor="rating">Rating: &nbsp;</label>
            <input 
            type="number" 
            min={1}
            max={5} 
            name="rating" 
            // value={formik.values.rating} 
            value={formData.rating}
            // onChange={formik.handleChange}
            onChange={handleInputChange}
            id="rating"
            />
            <br /><br />
            
            <button type="submit">Add Comment</button>
            </form>
        </div>
    )
}
