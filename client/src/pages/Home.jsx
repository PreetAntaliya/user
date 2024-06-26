import React from 'react'

const Home = () => {
  const { user } = JSON.parse(localStorage.getItem('auth'))
  return (
    <div className="container">
      <div className="main-body">
        <div className="row align-items-center">
          <div className="col-lg-4 h-100">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img src="https://i.pinimg.com/736x/c4/c4/7d/c4c47d20db79996fe7b8f92bf4f92d9d.jpg" alt="Admin" className="rounded-circle p-1 bg-success" width={110} />
                  <div className="mt-3">
                    <h6 className='text-secondary'>{user._id}</h6>
                    <h4>{user.name}</h4>
                    <p className="text-secondary mb-1">{user.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card">
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Full Name</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <input type="text" className="form-control" defaultValue={user.name} />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Email</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <input type="text" className="form-control" defaultValue={user.email} />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Phone</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <input type="text" className="form-control" defaultValue={user.phone} />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">City</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <input type="text" className="form-control" defaultValue={user.city} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3" />
                  <div className="col-sm-9">
                    <button className='btn btn-success'>SaveData</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home