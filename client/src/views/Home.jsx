const Home = () => {
    return (
        <div className="jumbotron centered w-full h-full">
            <div className="container">
                <i className="fas fa-key fa-6x"></i>
                <h1 className="display-3">Secrets</h1>
                <p className="lead">Don&apos;t keep your secrets, share them anonymously!</p>
                <hr className="my-4" />
                <a className="btn btn-light btn-lg" href="/register" role="button">Register</a>
                <a className="btn btn-dark btn-lg" href="/login" role="button">Login</a>
            </div>
        </div>
    )
}

export default Home
