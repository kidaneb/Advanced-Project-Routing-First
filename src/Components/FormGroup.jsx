export function FormGroup({ children, errorMessage }) {
  return (
    <>
      <div className={`form-group ${errorMessage ? "error" : undefined}`}>
        {children}
      </div>
    </>
  );
}
