import { Form, Link } from "react-router-dom";
import { FormGroup } from "./FormGroup";
import { useEffect, useRef } from "react";

export function Forms({
  errorMessage = {},
  
  users,
  isSubmmiting = false,
  defaultValues = {},
}) {
 
  return (
    <>
      <Form method="post" className="form">
        <div className="form-row">
          <FormGroup errorMessage={errorMessage.title}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
             
              defaultValue={defaultValues.title}
            />
            {errorMessage.title ? (
              <div className="error-message">{errorMessage.title}</div>
            ) : undefined}
            {/* {errorMessage=undefined} */}
          </FormGroup>

          <FormGroup>
            <label htmlFor="userId">Author</label>
            <select
              name="userId"
              id="userId"
              defaultValue={defaultValues.userId}
            >
              {users.map((user) => {
                return (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                );
              })}
            </select>
          </FormGroup>
        </div>

        <div className="form-row">
          <FormGroup errorMessage={errorMessage.body}>
            <label htmlFor="body">Body</label>
            <textarea
              name="body"
              id="body"
            
              defaultValue={defaultValues.body}
            ></textarea>
            {errorMessage.body ? (
              <div className="error-message">{errorMessage.body}</div>
            ) : undefined}
          </FormGroup>
        </div>

        <div className="form-row form-btn-row">
          <Link className="btn btn-outline" to="..">
            Cancel
          </Link>

          <button disabled={isSubmmiting} className="btn">
            {isSubmmiting ? "Loading" : "Save"}
          </button>
        </div>
      </Form>
    </> 
  );
}
