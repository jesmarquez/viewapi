import React from 'react'
import Head from 'next/head'
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
        <div>
        <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <script src="https://cdn.polyfill.io/v2/polyfill.min.js"/>
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        </Head>
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
                  <div className="list-group mt-2">
                    {
                      this.props.practicantes.map((practicante, i) => (
                        <ItemPracticante key={i} practicante = { practicante }/>
                      ))
                    }
                  </div>
                </div>
            </div>
        </div>
        </div>
      )
    }
  }
  
  class ItemPracticante extends React.Component {
    render() {
    return(
        <div>
        <a href="#" className="list-group-item list-group-item-action flex-column align-items-start active mt-1">
            <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{ this.props.practicante.username }</h5>
            <small>{ this.props.practicante.state }</small>
            </div>
            <p className="mb-1">{ this.props.practicante.university}</p>
            <small>{ this.props.practicante.email }</small>
        </a>
        <div className="dropdown">
          <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Assigments
          </a>
        
          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            {
              this.props.practicante.assigments.map((assigment, i) => (
                <a key={ assigment.id }className="dropdown-item" href="#">{ assigment.activity }</a>
              ))
            }
          </div>
        </div>
      </div>
      )
    }
  }
  export default View