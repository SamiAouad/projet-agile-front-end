<div >
<div className=" container d-flex justify-content-center my-5 ">
    <div className="row my-2 mx-2 main">
        <div className="col mycol">
        <img src={img}  width="100%" height="100%" className="rounded"/> 
        </div>
   <div  className="col align-self-center">
   <form onSubmit={formik.handleSubmit}>
    <div className='col-sm-8 offset-sm-2 text-center form-signin'>
        <h1>Welcome Back !</h1>
        <input type='text' name='username' value={formik.values.username} onChange={formik.handleChange} placeholder='username' className='form-control' />
        {formik.errors.username ? <div className="text-danger">{formik.errors.username}</div> : null}
        <br />
        <input type='password' name='password' value={formik.values.password} onChange={formik.handleChange} placeholder='password' className='form-control' />
        {formik.errors.password ? <div className="text-danger">{formik.errors.password}</div> : null}
        <br />
        <button type='submit' className='btn btn-primary'>Login</button>
    </div>
</form>
   </div>

    </div>
    </div>

</div>