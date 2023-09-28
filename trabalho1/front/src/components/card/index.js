import './style.css'

function Card({children}) {
    return (
      <div className="card-container">
        <div className="card-body">
          {children}
        </div>
      </div>
    );
  }
  
  export default Card;
  