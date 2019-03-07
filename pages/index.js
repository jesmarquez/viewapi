import React from 'react'
import "../styles.scss"
import fetch from 'isomorphic-fetch'

class View extends React.Component {
    static async getInitialProps({ req }) {
      const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
      
      // If running on server, perform Async call
      if (typeof window === 'undefined') {
          try {
              const res = await fetch('http://localhost:5000/api/students')
              const data = await res.json()
              const practicantes = data

              return { userAgent, practicantes }
          } catch (e) {
              let error = "Unable to fetch AsyncData on server"
              return { error }
          }
      }
    }

    render() {
      var alertError = (
          <div className="row align-items-center">
              <div className="col">
                  <div className="alert alert-primary" role="alert">
                      { this.props.error }            
                  </div>
              </div>
          </div>)

      return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col">
                
                </div>
                <div className="col">
                    <div className="alert alert-primary" role="alert">
                        View API
                    </div>
                </div>
                <div className="col">
                
                </div>
            </div>
            <div className="row align-items-center">
                <div className="col">
                    <button type="button" className="btn btn-primary">Practicantes</button>
                </div>
                <div className="col">
                    <button type="button" className="btn btn-secondary">Coordinadores</button>
                </div>
                <div className="col">
                <button type="button" className="btn btn-secondary">Entregas</button>
                </div>
            </div>

            { (this.props.error !== undefined) && alertError }

            <div className="row align-items-center mt-2" >
                <div className="col">
                <div className="list-group">
                    <a href="#" className="list-group-item list-group-item-action flex-column align-items-start active">
                        <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">Jesus Marquez</h5>
                        <small>3 days ago</small>
                        </div>
                        <p className="mb-1">IBM inc</p>
                        <small>Culminado</small>
                    </a>
                    <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                        <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">List group item heading</h5>
                        <small className="text-muted">3 days ago</small>
                        </div>
                        <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                        <small className="text-muted">Donec id elit non mi porta.</small>
                    </a>
                    <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                        <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">List group item heading</h5>
                        <small className="text-muted">3 days ago</small>
                        </div>
                        <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                        <small className="text-muted">Donec id elit non mi porta.</small>
                    </a>
                    </div>
                </div>
            </div>
        </div>
      )
    }
  }
  
  export default View